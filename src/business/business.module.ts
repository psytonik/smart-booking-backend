import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature()],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
