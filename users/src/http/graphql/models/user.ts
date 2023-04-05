import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  password?: string;
}
