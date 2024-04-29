import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { TimeSlotsReqDto } from './dto/timeslot.req-dto';
import { DayTimetableDto } from './dto/timeslot.res-dto ';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('getTimeSlots')
  getTimeSlots(@Body() timeSlotData: TimeSlotsReqDto): DayTimetableDto[] {
    const timeSlots = this.appService.getTimeSlots(timeSlotData);

    return timeSlots;
  }
}
