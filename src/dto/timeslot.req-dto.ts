import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsTimeZone,
} from 'class-validator';

export class TimeSlotsReqDto {
  @IsString()
  start_day_identifier: string;

  @IsString()
  @IsTimeZone()
  timezone_identifier: string;

  @IsNumber()
  service_duration: number;

  @IsOptional()
  @IsNumber()
  days?: number = 1;

  @IsOptional()
  @IsNumber()
  timeslot_interval?: number = 30;

  @IsOptional()
  @IsBoolean()
  is_ignore_schedule?: boolean = false;

  @IsOptional()
  @IsBoolean()
  is_ignore_workhour?: boolean = false;
}
