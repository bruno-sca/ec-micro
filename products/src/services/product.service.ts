import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateProductInput {
  name: string;
  description: string;
  availableAmount: number;
  price: number;
}

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  listAllProducts() {
    return this.prismaService.product.findMany();
  }

  getProductById(id: string) {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }

  async createProduct(data: CreateProductInput) {
    const slug = slugify(data.name, { lower: true });

    const productWithSameSlug = await this.prismaService.product.findUnique({
      where: {
        slug,
      },
    });

    if (productWithSameSlug) {
      throw new Error('Product with same slug already exists');
    }

    return this.prismaService.product.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  async decreaseProductAmount(productId: string, amount: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.availableAmount - amount < 0) {
      throw new Error('Product is out of stock');
    }

    return this.prismaService.product.update({
      where: {
        id: product.id,
      },
      data: {
        availableAmount: {
          decrement: product.availableAmount - amount,
        },
      },
    });
  }
}
