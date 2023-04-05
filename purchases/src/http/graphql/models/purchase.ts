import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED',
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Available purchase statuses',
});

@ObjectType('Purchase')
export class Purchase {
  @Field(() => ID)
  id: string;

  @Field(() => PurchaseStatus)
  status: PurchaseStatus;

  @Field()
  userId: string;

  @Field()
  productId: string;

  @Field()
  quantity: number;
}
