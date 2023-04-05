import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('SigninOutput')
export class SigninOutput {
  @Field()
  access_token: string;
}
