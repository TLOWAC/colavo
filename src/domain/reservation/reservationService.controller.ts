import { Body, Controller, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { TimeSlotsReqDto } from './dto/timeslot.req-dto';
import { DayTimetableDto } from './dto/timeslot.res-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Reservation')
@Controller()
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('getTimeSlots')
  @ApiOperation({
    summary: '예약 가능한 시간대 목록 조회 API',
    description: '살롱의 고객이 예약을 잡을 수 있는 DayTimetable 리스트를 반환',
  })
  @ApiBody({ type: TimeSlotsReqDto })
  @ApiResponse({ status: 200, type: DayTimetableDto })
  getTimeSlots(@Body() timeSlotData: TimeSlotsReqDto): DayTimetableDto[] {
    const timeSlots = this.reservationService.getTimeSlots(timeSlotData);

    return timeSlots;
  }
}
