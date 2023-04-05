import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/http/auth/auth.guard';
import { UsersService } from 'src/services/users.service';
import { CreateUserInput } from '../inputs/create-user-input';
import { SigninOutput } from '../models/signin-output';
import { User } from '../models/user';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.listAllUsers();
  }

  @Mutation(() => User)
  async user(@Args('data') data: CreateUserInput): Promise<User> {
    return this.usersService.create(data);
  }

  @Mutation(() => SigninOutput)
  async signin(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<SigninOutput> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const { password: userPassword } = user;

    if (userPassword !== password) {
      throw new Error('Invalid password');
    }

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        name: user.name,
        email: user.email,
      }),
    };
  }
}
