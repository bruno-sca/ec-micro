import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { resolve } from 'node:path';
import { UsersService } from 'src/services/users.service';
import { UsersResolver } from './graphql/resolvers/students.resolver';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? '',
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class HttpModule {}
