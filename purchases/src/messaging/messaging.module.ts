import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PurchasesController } from './controllers/purchases.controller';
import { PurchasesService } from 'src/services/purchases.service';
import { KafkaService } from './kafka.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot()],
  controllers: [PurchasesController],
  providers: [PurchasesService, KafkaService],
  exports: [KafkaService],
})
export class MessagingModule {}
