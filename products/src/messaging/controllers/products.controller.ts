import { Controller } from '@nestjs/common';
import { KafkaService } from '../kafka.service';
import { ProductsService } from 'src/services/product.service';
import { EventPattern } from '@nestjs/microservices';

type NewPurchaseEvent = {
  productId: string;
  purchaseId: string;
  quantity: number;
};

@Controller()
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly kafkaService: KafkaService,
  ) {}

  @EventPattern('purchases.new_purchase')
  async handleNewPurchase(data: NewPurchaseEvent) {
    const { productId, quantity, purchaseId } = data;

    const productToUpdate = await this.productsService.getProductById(
      productId,
    );

    try {
      await this.productsService.decreaseProductAmount(
        productToUpdate.id,
        quantity,
      );
      this.kafkaService.emit('purchases.purchase_confirmation', {
        purchaseId,
      });
    } catch (e) {
      this.kafkaService.emit('purchases.purchase_failed', {
        purchaseId,
        reason: 'product_not_available',
      });
    }
  }
}
