import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { PurchaseStatus } from '../http/graphql/models/purchase';

type PurchaseCreateInput = {
  userId: string;
  productId: string;
  quantity: number;
};

@Injectable()
export class PurchasesService {
  constructor(private prismaService: PrismaService) {}

  async createPurchase(data: PurchaseCreateInput) {
    return this.prismaService.purchase.create({ data });
  }

  findByUserId(userId: string) {
    return this.prismaService.purchase.findMany({
      where: { userId },
    });
  }

  findById(id: string) {
    return this.prismaService.purchase.findUnique({
      where: { id },
    });
  }

  updatePurchaseStatus(id: string, status: PurchaseStatus) {
    return this.prismaService.purchase.update({
      where: { id },
      data: { status },
    });
  }
}
