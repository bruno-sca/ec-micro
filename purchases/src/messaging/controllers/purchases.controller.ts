import { Controller } from '@nestjs/common';
import { PurchasesService } from 'src/services/purchases.service';
import { KafkaService } from '../kafka.service';
import { EventPattern } from '@nestjs/microservices';
import { PurchaseStatus } from 'src/http/graphql/models/purchase';

type PurchaseConfirmationEvent = {
  purchaseId: string;
};

type PurchaseFailedEvent = {
  purchaseId: string;
  reason: string;
};

@Controller()
export class PurchasesController {
  constructor(
    private readonly purchasesService: PurchasesService,
    private readonly kafkaService: KafkaService,
  ) {}

  @EventPattern('purchases.purchase_confirmation')
  async handlePurchaseConfirmation(data: PurchaseConfirmationEvent) {
    await this.purchasesService.updatePurchaseStatus(
      data.purchaseId,
      PurchaseStatus.APPROVED,
    );
  }

  @EventPattern('purchases.purchase_failed')
  async handlePurchaseFailed(data: PurchaseFailedEvent) {
    await this.purchasesService.updatePurchaseStatus(
      data.purchaseId,
      PurchaseStatus.FAILED,
    );
  }
}
