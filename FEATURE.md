
# 기능 구현

## 전체적인 흐름
- request dto destructuring
- start_day_identifier ~ start_day_identifier + days 일별 날짜 값 구하기 -> `startDays`
- `startDays` 와 timezone_identifier 를 사용해서 나라별 타임존에 맞는 요일 구하기 -> `dayOfWeeks`
- `dayOfWeeks` 를 사용해서 data[workhours] 에서 is_day_off 정보와 open_interval, close_interval 구하기 -> `workDaysInfo`
- open_interval, close_interval 을 기준으로 res[timeslots] 의 begin_at, end_at 범위 설정 및 req[timeslot_interval] 단위로 예약 시간 주기 설정
  - req[is_ignore_schedule] 값 검증 ( data[events] 데이터 검증 )
  - req[is_ignore_workhour] 값 검증 ( data[workhours] 데이터 검증 )
  - req[service_duration] 값 검증 ( service_duration 이 다른 사용자의 예약 시작 시간에 겹치지 않고 가게의 마감 시간내 마무리가 가능한지 검증 )

<br/>

### `res[start_of_day]`
- req[start_day_identifier] ~ req[start_day_identifier] + req[days] 를 사용해 일별 Unixstamp seconds 를 구한다.
- req[days] 가 별도로 입력되는 경우에는 Unixstamp seconds 에 + 86400 륻 더해서 일 단위를 구분한다.
  - 예 : req[days] 가 2인 경우 now, now + 1d
  
```ts
  // YYYY-MM-DD 를 Unixstamp seconds 로 변경
  https://day.js.org/docs/en/display/unix-timestamp
  dayjs('2021-05-09').unix() // 1620518400
  dayjs('2021-05-10').unix() // 1620604800
```

<br/>

### `res[is_day_off]`
- startDays 와 req[timezone_identifier] 를 사용해서 나라별 타임존에 맞는 요일을 구한다.
- data[workhours] 에서 요일별 is_day_off 를 가져와서 반환한다. 
  - 이떄 data[workhours] 에서 is_day_off 를 가져올떄 res[start_of_day] 기준 으로 요일 정보를 key 값으로 데이터를 가져온다.


```ts
// 타임존 변경에 따른 요일값 변경
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// 플러그인 확장
dayjs.extend(utc);
dayjs.extend(timezone);

// 타임존 설정
const timezone = 'America/New_York'; // 뉴욕 타임존
const date = dayjs.tz('2022-04-27', timezone);

// 요일 가져오기
const dayOfWeek = date.format('ddd');
console.log(dayOfWeek); // 예: "Wed"

```

<br/>

### `res[timeslots]`
- open_interval, close_interval 을 기준으로 res[timeslots] 의 begin_at, end_at 범위 설정 및 req[timeslot_interval] 단위로 예약 시간 주기 설정를 설정하여 값을 구한다.
  - req[is_ignore_schedule] 값 검증 ( data[events] 데이터 검증 )
  - req[is_ignore_workhour] 값 검증 ( data[workhours] 데이터 검증 )
  - req[service_duration] 값 검증 ( service_duration 이 다른 사용자의 예약 시작 시간에 겹치지 않고 가게의 마감 시간내 마무리가 가능한지 검증 )

<br/>

## 참고자료
- [dayjs](https://day.js.org/en/)