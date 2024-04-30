import { Injectable } from '@nestjs/common';
import { TimeSlotsReqDto } from './dto/timeslot.req-dto';
import { events, workhours } from '@data';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class ReservationService {
  getTimeSlots(timeSlotData: TimeSlotsReqDto) {
    const {
      start_day_identifier,
      timezone_identifier,
      service_duration, // UnixInterval
      days,
      // FIXME: timeslot_interval 변수명을 timeslot_interval: timeslotUnixInterval 로 변경
      timeslot_interval, // UnixInterval
      is_ignore_schedule,
      is_ignore_workhour,
    } = timeSlotData;

    let startDay = dayjs(start_day_identifier, 'YYYYMMDD');
    const dayTimetable = [];

    for (let i = 1; i <= days; i++) {
      // [fin] start_day_identifier ~ start_day_identifier + days 일별 날짜 값 구하기 -> startDayUnixStamp
      const startDayUnixStamp = startDay.unix();
      // [fin] startDayUnixStamp 와 timezone_identifier 를 사용해서 나라별 타임존에 맞는 요일 구하기 -> dayOfWeek
      const dayOfWeek = dayjs
        .unix(startDayUnixStamp)
        .tz(timezone_identifier)
        .format('ddd')
        .toLowerCase();

      // dayOfWeek 를 사용해서 data[workhours] 필터링
      const workDayInfo = workhours.find(
        (workhour) => workhour.key === dayOfWeek,
      );

      // is_ignore_workhour 가 true 인 경우 0시 00분 ~ 23시 59분으로 openTimeUnixInterval, closeTimeUnixInterval 설정
      const openTimeUnixInterval = is_ignore_workhour
        ? 0 // 자정
        : workDayInfo.open_interval;
      const closeTimeUnixInterval = is_ignore_workhour
        ? 86340 // 23시 59분
        : workDayInfo.close_interval;

      const timeslots = [];
      for (
        let i = openTimeUnixInterval; // 오픈 시간
        i < closeTimeUnixInterval; // 마감 시간
        i += timeslot_interval // 간격
      ) {
        const begin_at = i + startDayUnixStamp; // 오픈 기준 시간 + 시작일
        const end_at = begin_at + service_duration; // 마감 기준 시간 + 시작일 + 서비스 시간

        // end_at 이 가게 운영 마감 시간(UnixStamp) 범위 안에 있는지 확인.
        // end_at 이 가게 운영 시간을 넘어가면 timeslots 에 추가하지 않음.
        if (end_at > closeTimeUnixInterval) {
          continue;
        }
        // 만약 범위를 벗어난 경우에는 해당 데이터는 timeslots 에 입력하지 않는다.
        timeslots.push({ begin_at, end_at });
      }

      if (!is_ignore_schedule) {
        // timeslots 필터링 스케줄이 겹치는 경우 제외
        // event_sample 데이터와 비교
        const filteredTimeSlots = timeslots.filter((timeSlot) => {
          // Check if the time slot overlaps with any event
          for (const event of events) {
            if (
              (timeSlot.begin_at >= event.begin_at &&
                timeSlot.begin_at <= event.end_at) ||
              (timeSlot.end_at >= event.begin_at &&
                timeSlot.end_at <= event.end_at)
            ) {
              return false;
            }
          }
          return true;
        });
        dayTimetable.push({
          start_of_day: startDayUnixStamp,
          day_modifier: '',
          is_day_off: workDayInfo.is_day_off,
          timeslots: filteredTimeSlots,
        });
      } else {
        dayTimetable.push({
          start_of_day: startDayUnixStamp,
          day_modifier: '',
          is_day_off: workDayInfo.is_day_off,
          timeslots: timeslots,
        });
      }

      startDay = startDay.add(1, 'day');
    }

    // request dto destructuring
    // [fin] start_day_identifier ~ start_day_identifier + days 일별 날짜 값 구하기 -> startDayUnixStamp
    // [fin] startDayUnixStamps 와 timezone_identifier 를 사용해서 나라별 타임존에 맞는 요일 구하기 -> dayOfWeek
    // [fin] dayOfWeek 를 사용해서 data[workhours] 필터링
    // [fin] req[is_ignore_schedule] 값 검증 ( data[events] 데이터 검증 )
    // [fin] is_ignore_workhour 가 true 인 경우 0시 00분 ~ 23시 59분으로 openTimeUnixInterval, closeTimeUnixInterval 설정
    // open_interval, close_interval 을 기준으로 res[timeslots] begin_at, end_at 범위 설정 및 req[timeslot_interval] 단위로 예약 시간 주기 설정
    // - req[is_ignore_workhour] 값 검증 ( data[workhours] 데이터 검증 )
    // - req[service_duration] 값 검증 ( service_duration 이 다른 사용자의 예약 시작 시간에 겹치지 않고 가게의 마감 시간내 마무리가 가능한지 검증 )
    // ? timeslot_interval 은 openTime += timeslot_interval 해서 예약 가능 목록을 출력할때 사용하고, service_duration 은 end_at += service_duration 해서 events 설정할때 사용하는건가?

    return dayTimetable;
  }
}
