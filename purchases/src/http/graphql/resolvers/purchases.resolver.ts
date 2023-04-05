import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { KafkaService } from 'src/messaging/kafka.service';
import { PurchasesService } from 'src/services/purchases.service';
import { Purchase } from '../models/purchase';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { CurrentUser } from '../../auth/current-user/current-user.decorator';
import { AuthUser } from '../../auth/current-user/current-user.decorator';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly kafkaService: KafkaService,
  ) {}

  @Query(() => [Purchase])
  async userPurchases(@Args('userId') userId: string) {
    return this.purchasesService.findByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Purchase)
  async createPurchase(
    @CurrentUser() { user_id: userId }: AuthUser,
    @Args('data') data: CreatePurchaseInput,
  ) {
    const purchase = await this.purchasesService.createPurchase({
      productId: data.productId,
      quantity: data.quantity,
      userId,
    });
    this.kafkaService.emit('purchases.new_purchase', {
      purchaseId: purchase.id,
      productId: purchase.productId,
      quantity: purchase.quantity,
    });
    return purchase;
  }
}
