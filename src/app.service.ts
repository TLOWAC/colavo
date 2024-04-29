import { Injectable } from '@nestjs/common';
import { TimeSlotsReqDto } from './dto/timeslot.req-dto';
import { responseSampleData } from './sample-data';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTimeSlots(timeSlotData: TimeSlotsReqDto) {
    const {} = timeSlotData;

    // request dto destructuring
    // start_day_identifier ~ start_day_identifier + days 일별 날짜 값 구하기 -> startDays
    // startDays 와 timezone_identifier 를 사용해서 나라별 타임존에 맞는 요일 구하기 -> dayOfWeeks
    // dayOfWeeks 를 사용해서 data[workhours] 에서 is_day_off 정보와 open_interval, close_interval 구하기 -> workDaysInfo
    // open_interval, close_interval 을 기준으로 res[timeslots] begin_at, end_at 범위 설정 및 req[timeslot_interval] 단위로 예약 시간 주기 설정
    // - req[is_ignore_schedule] 값 검증 ( data[events] 데이터 검증 )
    // - req[is_ignore_workhour] 값 검증 ( data[workhours] 데이터 검증 )
    // - req[service_duration] 값 검증 ( service_duration 이 다른 사용자의 예약 시작 시간에 겹치지 않고 가게의 마감 시간내 마무리가 가능한지 검증 )

    return responseSampleData;
  }
}
