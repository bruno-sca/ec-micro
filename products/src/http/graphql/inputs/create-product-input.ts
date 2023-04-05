import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  availableAmount: number;

  @Field({ nullable: true })
  productImageUrl?: string;
}
