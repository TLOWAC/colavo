import { IsNumber, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TimeslotDto {
  @IsNumber()
  begin_at: number;

  @IsNumber()
  end_at: number;
}

export class DayTimetableDto {
  @IsNumber()
  start_of_day: number;

  @IsNumber()
  day_modifier: number;

  @IsBoolean()
  is_day_off: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimeslotDto)
  timeslots: TimeslotDto[];
}
