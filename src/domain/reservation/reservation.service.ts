import { Injectable } from '@nestjs/common';
import { TimeSlotsReqDto } from './dto/timeslot.req-dto';
import { events, workhours } from '../../data';
import {
  DAY_START_UNIX_INTERVAL,
  DAY_END_UNIX_INTERVAL,
} from '../../common/constants/time';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class ReservationService {
  getTimeSlots(timeSlotData: TimeSlotsReqDto) {
    const {
      startDayIdentifier,
      timezoneIdentifier,
      serviceDuration, // UnixInterval
      days,
      timeslotInterval, // UnixInterval
      isIgnoreSchedule,
      isIgnoreWorkhour,
    } = timeSlotData;

    // NOTE: tz 기준 Dayjs 객체 생성
    let startDay = dayjs.tz(startDayIdentifier, 'YYYYMMDD', timezoneIdentifier);

    const dayTimetable = [];

    // NOTE: 일별 예약 가능 목록 생성
    for (let i = 0; i < days; i++) {
      // NOTE: startDay(Dayjs 객체) 로 Unix TimeStamp 값 구하기 (tz 별로 "20210509" 값에 대한 Unix TimeStamp 값이 다름)
      // Asia/Seoul => 1620486000 , America/Los_Angeles => 1620543600
      const startDayUnixStamp = startDay.unix();

      // NOTE: 타임존에 맞는 요일 구하기
      // workhours.json 데이터 조회를 위해 요일 정보를 소문자로 변환
      const dayOfWeek = startDay.format('ddd').toLowerCase();

      // NOTE: dayOfWeek 를 사용해서 workhours.json 에서 일치하는 요일의 데이터 가져오기
      // open_interval, close_interval, is_day_off
      const workDayInfo = workhours.find(
        (workhour) => workhour.key === dayOfWeek,
      );

      // NOTE: 가게 오픈 시간 설정
      // isIgnoreWorkhour: true  => startDayUnixStamp(UnixTimeStamp, 00시00분00초) + DAY_START_UNIX_INTERVAL(UnixInterval, 0)
      // isIgnoreWorkhour: false => startDayUnixStamp(UnixTimeStamp, 00시00분00초) + open_interval(UnixInterval,오픈시간)
      const openTimeUnixTimestamp = isIgnoreWorkhour
        ? startDayUnixStamp + DAY_START_UNIX_INTERVAL // 자정
        : startDayUnixStamp + workDayInfo.open_interval;

      // NOTE: 가게 마감 시간 설정
      // isIgnoreWorkhour: true  => startDayUnixStamp(UnixTimeStamp, 00시00분00초) + DAY_END_UNIX_INTERVAL(UnixInterval, 23시59분)
      // isIgnoreWorkhour: false => startDayUnixStamp(UnixTimeStamp, 00시00분00초) + close_interval(UnixInterval,마감시간)
      const closeTimeUnixTimestamp = isIgnoreWorkhour
        ? startDayUnixStamp + DAY_END_UNIX_INTERVAL // 23시 59분
        : startDayUnixStamp + workDayInfo.close_interval;

      // NOTE: 가게 예약 가능 시간 설정
      const timeslots = [];
      for (
        let i = openTimeUnixTimestamp; // 오픈 시간
        i < closeTimeUnixTimestamp; // 마감 시간
        i += timeslotInterval // 예약 간격
      ) {
        const begin_at = i; // 예약 시작 시간
        const end_at = begin_at + serviceDuration; // 예약 시작 시간 + 서비스 시간

        // NOTE: 가게 예약 가능 시간 설정 예외처리
        // 1. end_at 이 가게 운영 마감 시간(UnixStamp) 범위 밖인 경우
        // 2. isIgnoreWorkhour: true 인 경우, 가게 운영 마감시간과 서비스 종료 시간 비교 X
        if (end_at > closeTimeUnixTimestamp && !isIgnoreWorkhour) {
          continue;
        }

        // NOTE: 가게 예약 가능 시간 추가
        timeslots.push({ begin_at, end_at });
      }

      // NOTE: 가게 예약 가능 시간 설정 예외처리 - isIgnoreSchedule
      if (!isIgnoreSchedule) {
        // NOTE: 예약 스케줄(event.json) 이 겹치는 경우 가게 예약 가능 시간에서 제외
        const filteredTimeSlots = timeslots.filter((timeSlot) => {
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
          day_modifier: i,
          is_day_off: workDayInfo.is_day_off,
          timeslots: filteredTimeSlots,
        });
      } else {
        dayTimetable.push({
          start_of_day: startDayUnixStamp,
          day_modifier: i,
          is_day_off: workDayInfo.is_day_off,
          timeslots: timeslots,
        });
      }

      // NOTE: 날짜 데이터 증가
      startDay = startDay.add(1, 'day');
    }

    return dayTimetable;
  }
}
