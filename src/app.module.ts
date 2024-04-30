import { Module } from '@nestjs/common';
import { AppController } from './domain/reservation/reservationService.controller';
import { AppService } from './domain/reservation/reservation.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
