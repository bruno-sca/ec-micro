import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface AuthUser {
  user_id: string;
  name: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): AuthUser => {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: { user },
    } = ctx.getContext();

    return {
      user_id: user.sub,
      email: user.email,
      name: user.name,
    };
  },
);
