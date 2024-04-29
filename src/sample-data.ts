export const workhours = [
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'fri',
    open_interval: 36000,
    weekday: 6,
  },
  {
    close_interval: 36900,
    is_day_off: false,
    key: 'mon',
    open_interval: 36900,
    weekday: 2,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'sat',
    open_interval: 36000,
    weekday: 7,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'sun',
    open_interval: 36000,
    weekday: 1,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'thu',
    open_interval: 36000,
    weekday: 5,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'tue',
    open_interval: 36000,
    weekday: 3,
  },
  {
    close_interval: 72000,
    is_day_off: false,
    key: 'wed',
    open_interval: 36000,
    weekday: 4,
  },
];

export const events = [
  {
    begin_at: 1620268200,
    end_at: 1620275400,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620275400,
    end_at: 1620275400,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620276300,
    end_at: 1620275400,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620354600,
    end_at: 1620354900,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620441000,
    end_at: 1620469800,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
  {
    begin_at: 1620477000,
    end_at: 1620534600,
    created_at: 1620272253,
    updated_at: 1620272253,
  },
];

export const responseSampleData = [
  {
    start_of_day: 1538697600,
    day_modifier: 2,
    is_day_off: false,
    timeslots: [
      {
        begin_at: 1538740800,
        end_at: 1538744400,
      },
      {
        begin_at: 1538742600,
        end_at: 1538746200,
      },
      {
        begin_at: 1538744400,
        end_at: 1538748000,
      },
    ],
  },
  {
    start_of_day: 1538784000,
    day_modifier: 3,
    is_day_off: false,
    timeslots: [
      {
        begin_at: 1538827200,
        end_at: 1538830800,
      },
      {
        begin_at: 1538829000,
        end_at: 1538832600,
      },
      {
        begin_at: 1538830800,
        end_at: 1538834400,
      },
    ],
  },
];

export const requestSampleData = {
  start_day_identifier: '20210910',
  days: 3,
  service_duration: 3600,
  timeslot_interval: 1800,
  is_ignore_schedule: true,
  is_ignore_workhour: false,
  timezone_identifier: 'Asia/Seoul',
};
