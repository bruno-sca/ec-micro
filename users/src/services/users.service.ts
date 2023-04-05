import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User } from 'src/http/graphql/models/user';

interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(user: CreateUserParams): Promise<User> {
    return this.prisma.user.create({
      data: user,
    });
  }

  listAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      select: {
        createdAt: true,
        email: true,
        id: true,
        name: true,
        updatedAt: true,
      },
    });
  }

  findUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
