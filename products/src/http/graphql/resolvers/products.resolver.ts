import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from 'src/services/product.service';
import { Product } from '../models/product';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/http/auth/auth.guard';
import { CreateProductInput } from '../inputs/create-product-input';

@Resolver()
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  products() {
    return this.productsService.listAllProducts();
  }

  @Query(() => Product)
  product(@Args('id') id: string) {
    return this.productsService.getProductById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.createProduct(data);
  }
}
