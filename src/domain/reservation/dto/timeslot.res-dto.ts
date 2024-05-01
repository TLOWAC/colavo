import { IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class TimeslotDto {
  @ApiProperty({ description: '예약 가능 스케줄 - 시작 시간' })
  @IsNumber()
  begin_at: number;

  @ApiProperty({ description: '예약 가능 스케줄 - 종료 시간' })
  @IsNumber()
  end_at: number;
}

export class DayTimetableDto {
  @ApiProperty({ description: '예약 기준일 ( 하루 단위 )' })
  @IsNumber()
  start_of_day: number;

  @ApiProperty({
    description:
      '조회일 기준 start_of_day 와의 차이값 ( 예시 : 2일후 예약이 가능한 경우 day_modifier : 2 )',
  })
  @IsNumber()
  day_modifier: number;

  @ApiProperty({ description: '가게 휴무 여부' })
  @IsBoolean()
  is_day_off: boolean;

  @ApiProperty({ description: 'start_of_day 기준 당일 예약 가능 스케줄 목록' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeslotDto)
  timeslots: TimeslotDto[];
}
