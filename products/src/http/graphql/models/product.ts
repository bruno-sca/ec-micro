import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Product')
export class Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  availableAmount: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
