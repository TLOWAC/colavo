import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsTimeZone,
} from 'class-validator';

export class TimeSlotsReqDto {
  @ApiProperty({
    name: 'start_day_identifier',
    description: '시작일 ( 예 : "YYYYMMDD" )',
    default: '20210509',
  })
  @Expose({ name: 'start_day_identifier' })
  @IsString()
  startDayIdentifier: string;

  @ApiProperty({
    name: 'timezone_identifier',
    description: '타임존 ( 예 : "America/Los_Angeles", "Asia/Seoul" )',
    default: 'Asia/Seoul',
  })
  @Expose({ name: 'timezone_identifier' })
  @IsString()
  @IsTimeZone()
  timezoneIdentifier: string;

  @ApiProperty({
    name: 'service_duration',
    description: '미용 서비스 제공 시간 ( s, 3600 > 1시간 )',
    default: 3600,
  })
  @Expose({ name: 'service_duration' })
  @IsNumber()
  serviceDuration: number;

  @ApiProperty({
    description: '달력의 일/주/월/년 과 같이 용도별 표시',
    default: 3,
  })
  @IsOptional()
  @IsNumber()
  days?: number = 1;

  @ApiProperty({
    name: 'timeslot_interval',
    description: '예약 가능한 시간대 간격 ( 예: 14:00, 14:30 )',
    default: 1800,
  })
  @Expose({ name: 'timeslot_interval' })
  @IsOptional()
  @IsNumber()
  timeslotInterval?: number = 30;

  @ApiProperty({
    name: 'is_ignore_schedule',
    description: 'true 인 경우, 다른 고객의 예약 고려 X',
    default: false,
  })
  @Expose({ name: 'is_ignore_schedule' })
  @IsOptional()
  @IsBoolean()
  isIgnoreSchedule?: boolean = false;

  @ApiProperty({
    name: 'is_ignore_workhour',
    description: 'true 인 경우, 휴일,오픈시간,마감시간 고려 X',
    default: false,
  })
  @Expose({ name: 'is_ignore_workhour' })
  @IsOptional()
  @IsBoolean()
  isIgnoreWorkhour?: boolean = false;
}
