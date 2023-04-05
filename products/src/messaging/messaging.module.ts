import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductsService } from 'src/services/product.service';
import { KafkaService } from './kafka.service';
import { ProductsController } from './controllers/products.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [ProductsController],
  providers: [ProductsService, KafkaService],
  exports: [KafkaService],
})
export class MessagingModule {}
