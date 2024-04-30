import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsTimeZone,
} from 'class-validator';

export class TimeSlotsReqDto {
  @ApiProperty({ description: '시작일 ( 예 : "YYYYMMDD" )' })
  @IsString()
  start_day_identifier: string;

  @ApiProperty({
    description: '타임존 ( 예 : "America/Los_Angeles", "Asia/Seoul" )',
  })
  @IsString()
  @IsTimeZone()
  timezone_identifier: string;

  @ApiProperty({ description: '미용 서비스 제공 시간 ( s, 3600 > 1시간 )' })
  @IsNumber()
  service_duration: number;

  @ApiProperty({ description: '달력의 일/주/월/년 과 같이 용도별 표시' })
  @IsOptional()
  @IsNumber()
  days?: number = 1;

  @ApiProperty({
    description: '예약 가능한 시간대 간격 ( 예: 14:00, 14:30 )',
  })
  @IsOptional()
  @IsNumber()
  timeslot_interval?: number = 30;

  @ApiProperty({ description: 'true 인 경우, 다른 고객의 예약 고려 X' })
  @IsOptional()
  @IsBoolean()
  is_ignore_schedule?: boolean = false;

  @ApiProperty({ description: 'true 인 경우, 휴일,오픈시간,마감시간 고려 X' })
  @IsOptional()
  @IsBoolean()
  is_ignore_workhour?: boolean = false;
}
