## 과제 스펙 정의

### Request 스펙 정리



```ts
  interface RequestBody {
    start_day_identifier: string
    timezone_identifier: string
    service_duration: number
    days: number | null
    timeslot_interval: number | null
    is_ignore_schedule: boolean | null
    is_ignore_workhour: boolean | null
  }
```

<details>
  <summary>Request 데이터 예제 확인하기</summary>

  ```json
  {
    "start_day_identifier" : "20210910",
    "days": 3,
    "service_duration": 3600,
    "timeslot_interval": 1800,
    "is_ignore_schedule": true,
    "is_ignore_workhour": false,
    "timezone_identifier": "Asia/Seoul",
  }
  ```

</details>


| value                  | type              |     default     | description                                    |
| ---------------------- | ----------------- | :-------------: | ---------------------------------------------- |
| `start_day_identifier` | `string`          |      none       | 시작일 ( "YYYYMMDD" )                          |
| `timezone_identifier`  | `string`          |      none       | 타임존 ( "America/Los_Angeles", "Asia/Seoul" ) |
| `service_duration`     | `number`          |      none       | 미용 서비스 제공 시간 ( s, 3600 > 1시간 )      |
| `days`                 | `number \| null`  | 1 (단위 : day)  | 달력의 일/주/월/년 과 같이 용도별 표시         |
| `timeslot_interval`    | `number \| null`  | 30 (단위 : min) | 예약 가능한 시간대의 간격 ( 예: 14:00, 14:30 ) |
| `is_ignore_schedule`   | `boolean \| null` |      false      | true 인 경우, 다른 고객의 예약 고려 X          |
| `is_ignore_workhour`   | `boolean \| null` |      false      | true 인 경우, 휴일,오픈시간,마감시간 고려 X    |


<br/>


### Response 스펙 정리

```ts
  type ResponseBody = DayTimetable[]

  interface DayTimetable {
    start_of_day: number // Unixstamp seconds
    day_modifier: number
    is_day_off: boolean
    timeslots: Timeslot[]
  }

  interface Timeslot {
    begin_at: number // Unixstamp seconds
    end_at: number // Unixstamp seconds
  }
```

<details>
  <summary>Response 데이터 예제 확인하기</summary>

  ```json
    [ 
      { 
        "start_of_day": 1538697600, 
        "day_modifier": 2, 
        "is_day_off": false, 
        "timeslots": [ 
          { 
            "begin_at": 1538740800, 
            "end_at": 1538744400 
          }, 
          { 
            "begin_at": 1538742600, 
            "end_at": 1538746200 
          }, 
          { 
            "begin_at": 1538744400, 
            "end_at": 1538748000 
          } 
        ] 
      }, 
      { 
        "start_of_day": 1538784000, 
        "day_modifier": 3, 
        "is_day_off": false, 
        "timeslots": [ 
          { 
            "begin_at": 1538827200, 
            "end_at": 1538830800 
          }, 
          { 
            "begin_at": 1538829000, 
            "end_at": 1538832600 
          }, 
          { 
            "begin_at": 1538830800, 
            "end_at": 1538834400 
          } 
        ] 
      } 
    ]
  ```

</details>


<details>
  <summary>Response 데이터 예제 확인하기 (KST)</summary>

```json
[
  {
    "start_of_day": "2018-10-06T00:00:00+09:00",
    "day_modifier": 2,
    "is_day_off": false,
    "timeslots": [
      {
        "begin_at": "2018-10-06T09:00:00+09:00",
        "end_at": "2018-10-06T10:00:00+09:00"
      },
      {
        "begin_at": "2018-10-06T09:30:00+09:00",
        "end_at": "2018-10-06T10:30:00+09:00"
      },
      {
        "begin_at": "2018-10-06T10:00:00+09:00",
        "end_at": "2018-10-06T11:00:00+09:00"
      }
    ]
  },
  {
    "start_of_day": "2018-10-07T00:00:00+09:00",
    "day_modifier": 3,
    "is_day_off": false,
    "timeslots": [
      {
        "begin_at": "2018-10-07T09:00:00+09:00",
        "end_at": "2018-10-07T10:00:00+09:00"
      },
      {
        "begin_at": "2018-10-07T09:30:00+09:00",
        "end_at": "2018-10-07T10:30:00+09:00"
      },
      {
        "begin_at": "2018-10-07T10:00:00+09:00",
        "end_at": "2018-10-07T11:00:00+09:00"
      }
    ]
  }
]

```

</details>


| value                | type          | default | description                                                                                         |
| -------------------- | ------------- | :-----: | --------------------------------------------------------------------------------------------------- |
| `start_of_day`       | `number`      |  none   | 예약 기준일 ( 하루 단위 )                                                                           |
| `day_modifier`       | `number`      |  none   | 조회일 기준 `start_of_day` 와의 차이값 <br/> ( 예시 : 2일후 예약이 가능한 경우 `day_modifier : 2` ) |
| `is_day_off`         | `number`      |  none   | 가게 휴무일                                                                                         |
| `timeslots`          | `Timeslot[] ` |  none   | `start_of_day` 기준 당일 예약 가능 스케줄 목록                                                      |
| `Timeslot[begin_at]` | `number`      |  none   | `start_of_day` 기준 당일 예약 가능 스케줄 - 시작 시간                                               |
| `Timeslot[end_at]`   | `number`      |  none   | `start_of_day` 기준 당일 예약 가능 스케줄 - 종료 시간                                               |


### API 구현 케이스

1. **[기본]** `start_day_identifier,` `timezone_identifier`, `service_duration`, `days`,`timeslot_interval` 파라미터에 따른 `DayTimetable` 반환 하는 API 구현
2. `is_ignore_schedule:false`, `is_ignore_workhour:true` 케이스 구현 
3. `is_ignore_schedule:true`, `is_ignore_workhour:false` 케이스 구현
4. `is_ignore_schedule:false`, `is_ignore_workhour:false` 케이스 구현



<br/>


