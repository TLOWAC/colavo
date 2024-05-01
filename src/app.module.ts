import { Module } from '@nestjs/common';
import { ReservationController } from './domain/reservation/reservationService.controller';
import { ReservationService } from './domain/reservation/reservation.service';

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class AppModule {}
