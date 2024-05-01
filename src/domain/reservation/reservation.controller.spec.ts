import { Test, TestingModule } from '@nestjs/testing';
import { ReservationController } from './reservationService.controller';
import { ReservationService } from './reservation.service';

describe('AppController', () => {
  let reservationController: ReservationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [ReservationService],
    }).compile();

    reservationController = app.get<ReservationController>(
      ReservationController,
    );
  });

  const defaultTestCase = {
    startDayIdentifier: '20210509',
    days: 3, // ['sun','mon','tue'] , ['20210509', '20210510', '20210511']
    serviceDuration: 3600,
    timeslotInterval: 1800,
    isIgnoreSchedule: false,
    isIgnoreWorkhour: false,
    timezoneIdentifier: 'Asia/Seoul',
  };

  describe('api/getTimeSlots - Asia/Seoul', () => {
    it('default', () => {
      const testCaseResult = [
        {
          start_of_day: 1620486000,
          day_modifier: 0,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620536400,
              end_at: 1620540000,
            },
            {
              begin_at: 1620538200,
              end_at: 1620541800,
            },
            {
              begin_at: 1620540000,
              end_at: 1620543600,
            },
            {
              begin_at: 1620541800,
              end_at: 1620545400,
            },
            {
              begin_at: 1620543600,
              end_at: 1620547200,
            },
            {
              begin_at: 1620545400,
              end_at: 1620549000,
            },
            {
              begin_at: 1620547200,
              end_at: 1620550800,
            },
            {
              begin_at: 1620549000,
              end_at: 1620552600,
            },
            {
              begin_at: 1620550800,
              end_at: 1620554400,
            },
            {
              begin_at: 1620552600,
              end_at: 1620556200,
            },
            {
              begin_at: 1620554400,
              end_at: 1620558000,
            },
          ],
        },
        {
          start_of_day: 1620572400,
          day_modifier: 1,
          is_day_off: false,
          timeslots: [],
        },
        {
          start_of_day: 1620658800,
          day_modifier: 2,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620694800,
              end_at: 1620698400,
            },
            {
              begin_at: 1620696600,
              end_at: 1620700200,
            },
            {
              begin_at: 1620698400,
              end_at: 1620702000,
            },
            {
              begin_at: 1620700200,
              end_at: 1620703800,
            },
            {
              begin_at: 1620702000,
              end_at: 1620705600,
            },
            {
              begin_at: 1620703800,
              end_at: 1620707400,
            },
            {
              begin_at: 1620705600,
              end_at: 1620709200,
            },
            {
              begin_at: 1620707400,
              end_at: 1620711000,
            },
            {
              begin_at: 1620709200,
              end_at: 1620712800,
            },
            {
              begin_at: 1620711000,
              end_at: 1620714600,
            },
            {
              begin_at: 1620712800,
              end_at: 1620716400,
            },
            {
              begin_at: 1620714600,
              end_at: 1620718200,
            },
            {
              begin_at: 1620716400,
              end_at: 1620720000,
            },
            {
              begin_at: 1620718200,
              end_at: 1620721800,
            },
            {
              begin_at: 1620720000,
              end_at: 1620723600,
            },
            {
              begin_at: 1620721800,
              end_at: 1620725400,
            },
            {
              begin_at: 1620723600,
              end_at: 1620727200,
            },
            {
              begin_at: 1620725400,
              end_at: 1620729000,
            },
            {
              begin_at: 1620727200,
              end_at: 1620730800,
            },
          ],
        },
      ];

      expect(reservationController.getTimeSlots(defaultTestCase)).toStrictEqual(
        testCaseResult,
      );
    });
    it('is_ignore_schedule: true  , is_ignore_workhour: false', () => {
      const newTestCase = {
        ...defaultTestCase,
        isIgnoreSchedule: true,
      };
      const testCaseResult = [
        {
          start_of_day: 1620486000,
          day_modifier: 0,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620522000,
              end_at: 1620525600,
            },
            {
              begin_at: 1620523800,
              end_at: 1620527400,
            },
            {
              begin_at: 1620525600,
              end_at: 1620529200,
            },
            {
              begin_at: 1620527400,
              end_at: 1620531000,
            },
            {
              begin_at: 1620529200,
              end_at: 1620532800,
            },
            {
              begin_at: 1620531000,
              end_at: 1620534600,
            },
            {
              begin_at: 1620532800,
              end_at: 1620536400,
            },
            {
              begin_at: 1620534600,
              end_at: 1620538200,
            },
            {
              begin_at: 1620536400,
              end_at: 1620540000,
            },
            {
              begin_at: 1620538200,
              end_at: 1620541800,
            },
            {
              begin_at: 1620540000,
              end_at: 1620543600,
            },
            {
              begin_at: 1620541800,
              end_at: 1620545400,
            },
            {
              begin_at: 1620543600,
              end_at: 1620547200,
            },
            {
              begin_at: 1620545400,
              end_at: 1620549000,
            },
            {
              begin_at: 1620547200,
              end_at: 1620550800,
            },
            {
              begin_at: 1620549000,
              end_at: 1620552600,
            },
            {
              begin_at: 1620550800,
              end_at: 1620554400,
            },
            {
              begin_at: 1620552600,
              end_at: 1620556200,
            },
            {
              begin_at: 1620554400,
              end_at: 1620558000,
            },
          ],
        },
        {
          start_of_day: 1620572400,
          day_modifier: 1,
          is_day_off: false,
          timeslots: [],
        },
        {
          start_of_day: 1620658800,
          day_modifier: 2,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620694800,
              end_at: 1620698400,
            },
            {
              begin_at: 1620696600,
              end_at: 1620700200,
            },
            {
              begin_at: 1620698400,
              end_at: 1620702000,
            },
            {
              begin_at: 1620700200,
              end_at: 1620703800,
            },
            {
              begin_at: 1620702000,
              end_at: 1620705600,
            },
            {
              begin_at: 1620703800,
              end_at: 1620707400,
            },
            {
              begin_at: 1620705600,
              end_at: 1620709200,
            },
            {
              begin_at: 1620707400,
              end_at: 1620711000,
            },
            {
              begin_at: 1620709200,
              end_at: 1620712800,
            },
            {
              begin_at: 1620711000,
              end_at: 1620714600,
            },
            {
              begin_at: 1620712800,
              end_at: 1620716400,
            },
            {
              begin_at: 1620714600,
              end_at: 1620718200,
            },
            {
              begin_at: 1620716400,
              end_at: 1620720000,
            },
            {
              begin_at: 1620718200,
              end_at: 1620721800,
            },
            {
              begin_at: 1620720000,
              end_at: 1620723600,
            },
            {
              begin_at: 1620721800,
              end_at: 1620725400,
            },
            {
              begin_at: 1620723600,
              end_at: 1620727200,
            },
            {
              begin_at: 1620725400,
              end_at: 1620729000,
            },
            {
              begin_at: 1620727200,
              end_at: 1620730800,
            },
          ],
        },
      ];
      expect(reservationController.getTimeSlots(newTestCase)).toStrictEqual(
        testCaseResult,
      );
    });
    it('is_ignore_schedule: false , is_ignore_workhour: true', () => {
      const newTestCase = {
        ...defaultTestCase,
        isIgnoreWorkhour: true,
      };
      const testCaseResult = [
        {
          start_of_day: 1620486000,
          day_modifier: 0,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620536400,
              end_at: 1620540000,
            },
            {
              begin_at: 1620538200,
              end_at: 1620541800,
            },
            {
              begin_at: 1620540000,
              end_at: 1620543600,
            },
            {
              begin_at: 1620541800,
              end_at: 1620545400,
            },
            {
              begin_at: 1620543600,
              end_at: 1620547200,
            },
            {
              begin_at: 1620545400,
              end_at: 1620549000,
            },
            {
              begin_at: 1620547200,
              end_at: 1620550800,
            },
            {
              begin_at: 1620549000,
              end_at: 1620552600,
            },
            {
              begin_at: 1620550800,
              end_at: 1620554400,
            },
            {
              begin_at: 1620552600,
              end_at: 1620556200,
            },
            {
              begin_at: 1620554400,
              end_at: 1620558000,
            },
            {
              begin_at: 1620556200,
              end_at: 1620559800,
            },
            {
              begin_at: 1620558000,
              end_at: 1620561600,
            },
            {
              begin_at: 1620559800,
              end_at: 1620563400,
            },
            {
              begin_at: 1620561600,
              end_at: 1620565200,
            },
            {
              begin_at: 1620563400,
              end_at: 1620567000,
            },
            {
              begin_at: 1620565200,
              end_at: 1620568800,
            },
            {
              begin_at: 1620567000,
              end_at: 1620570600,
            },
            {
              begin_at: 1620568800,
              end_at: 1620572400,
            },
            {
              begin_at: 1620570600,
              end_at: 1620574200,
            },
          ],
        },
        {
          start_of_day: 1620572400,
          day_modifier: 1,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620572400,
              end_at: 1620576000,
            },
            {
              begin_at: 1620574200,
              end_at: 1620577800,
            },
            {
              begin_at: 1620576000,
              end_at: 1620579600,
            },
            {
              begin_at: 1620577800,
              end_at: 1620581400,
            },
            {
              begin_at: 1620579600,
              end_at: 1620583200,
            },
            {
              begin_at: 1620581400,
              end_at: 1620585000,
            },
            {
              begin_at: 1620583200,
              end_at: 1620586800,
            },
            {
              begin_at: 1620585000,
              end_at: 1620588600,
            },
            {
              begin_at: 1620586800,
              end_at: 1620590400,
            },
            {
              begin_at: 1620588600,
              end_at: 1620592200,
            },
            {
              begin_at: 1620590400,
              end_at: 1620594000,
            },
            {
              begin_at: 1620592200,
              end_at: 1620595800,
            },
            {
              begin_at: 1620594000,
              end_at: 1620597600,
            },
            {
              begin_at: 1620595800,
              end_at: 1620599400,
            },
            {
              begin_at: 1620597600,
              end_at: 1620601200,
            },
            {
              begin_at: 1620599400,
              end_at: 1620603000,
            },
            {
              begin_at: 1620601200,
              end_at: 1620604800,
            },
            {
              begin_at: 1620603000,
              end_at: 1620606600,
            },
            {
              begin_at: 1620604800,
              end_at: 1620608400,
            },
            {
              begin_at: 1620606600,
              end_at: 1620610200,
            },
            {
              begin_at: 1620608400,
              end_at: 1620612000,
            },
            {
              begin_at: 1620610200,
              end_at: 1620613800,
            },
            {
              begin_at: 1620612000,
              end_at: 1620615600,
            },
            {
              begin_at: 1620613800,
              end_at: 1620617400,
            },
            {
              begin_at: 1620615600,
              end_at: 1620619200,
            },
            {
              begin_at: 1620617400,
              end_at: 1620621000,
            },
            {
              begin_at: 1620619200,
              end_at: 1620622800,
            },
            {
              begin_at: 1620621000,
              end_at: 1620624600,
            },
            {
              begin_at: 1620622800,
              end_at: 1620626400,
            },
            {
              begin_at: 1620624600,
              end_at: 1620628200,
            },
            {
              begin_at: 1620626400,
              end_at: 1620630000,
            },
            {
              begin_at: 1620628200,
              end_at: 1620631800,
            },
            {
              begin_at: 1620630000,
              end_at: 1620633600,
            },
            {
              begin_at: 1620631800,
              end_at: 1620635400,
            },
            {
              begin_at: 1620633600,
              end_at: 1620637200,
            },
            {
              begin_at: 1620635400,
              end_at: 1620639000,
            },
            {
              begin_at: 1620637200,
              end_at: 1620640800,
            },
            {
              begin_at: 1620639000,
              end_at: 1620642600,
            },
            {
              begin_at: 1620640800,
              end_at: 1620644400,
            },
            {
              begin_at: 1620642600,
              end_at: 1620646200,
            },
            {
              begin_at: 1620644400,
              end_at: 1620648000,
            },
            {
              begin_at: 1620646200,
              end_at: 1620649800,
            },
            {
              begin_at: 1620648000,
              end_at: 1620651600,
            },
            {
              begin_at: 1620649800,
              end_at: 1620653400,
            },
            {
              begin_at: 1620651600,
              end_at: 1620655200,
            },
            {
              begin_at: 1620653400,
              end_at: 1620657000,
            },
            {
              begin_at: 1620655200,
              end_at: 1620658800,
            },
            {
              begin_at: 1620657000,
              end_at: 1620660600,
            },
          ],
        },
        {
          start_of_day: 1620658800,
          day_modifier: 2,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620658800,
              end_at: 1620662400,
            },
            {
              begin_at: 1620660600,
              end_at: 1620664200,
            },
            {
              begin_at: 1620662400,
              end_at: 1620666000,
            },
            {
              begin_at: 1620664200,
              end_at: 1620667800,
            },
            {
              begin_at: 1620666000,
              end_at: 1620669600,
            },
            {
              begin_at: 1620667800,
              end_at: 1620671400,
            },
            {
              begin_at: 1620669600,
              end_at: 1620673200,
            },
            {
              begin_at: 1620671400,
              end_at: 1620675000,
            },
            {
              begin_at: 1620673200,
              end_at: 1620676800,
            },
            {
              begin_at: 1620675000,
              end_at: 1620678600,
            },
            {
              begin_at: 1620676800,
              end_at: 1620680400,
            },
            {
              begin_at: 1620678600,
              end_at: 1620682200,
            },
            {
              begin_at: 1620680400,
              end_at: 1620684000,
            },
            {
              begin_at: 1620682200,
              end_at: 1620685800,
            },
            {
              begin_at: 1620684000,
              end_at: 1620687600,
            },
            {
              begin_at: 1620685800,
              end_at: 1620689400,
            },
            {
              begin_at: 1620687600,
              end_at: 1620691200,
            },
            {
              begin_at: 1620689400,
              end_at: 1620693000,
            },
            {
              begin_at: 1620691200,
              end_at: 1620694800,
            },
            {
              begin_at: 1620693000,
              end_at: 1620696600,
            },
            {
              begin_at: 1620694800,
              end_at: 1620698400,
            },
            {
              begin_at: 1620696600,
              end_at: 1620700200,
            },
            {
              begin_at: 1620698400,
              end_at: 1620702000,
            },
            {
              begin_at: 1620700200,
              end_at: 1620703800,
            },
            {
              begin_at: 1620702000,
              end_at: 1620705600,
            },
            {
              begin_at: 1620703800,
              end_at: 1620707400,
            },
            {
              begin_at: 1620705600,
              end_at: 1620709200,
            },
            {
              begin_at: 1620707400,
              end_at: 1620711000,
            },
            {
              begin_at: 1620709200,
              end_at: 1620712800,
            },
            {
              begin_at: 1620711000,
              end_at: 1620714600,
            },
            {
              begin_at: 1620712800,
              end_at: 1620716400,
            },
            {
              begin_at: 1620714600,
              end_at: 1620718200,
            },
            {
              begin_at: 1620716400,
              end_at: 1620720000,
            },
            {
              begin_at: 1620718200,
              end_at: 1620721800,
            },
            {
              begin_at: 1620720000,
              end_at: 1620723600,
            },
            {
              begin_at: 1620721800,
              end_at: 1620725400,
            },
            {
              begin_at: 1620723600,
              end_at: 1620727200,
            },
            {
              begin_at: 1620725400,
              end_at: 1620729000,
            },
            {
              begin_at: 1620727200,
              end_at: 1620730800,
            },
            {
              begin_at: 1620729000,
              end_at: 1620732600,
            },
            {
              begin_at: 1620730800,
              end_at: 1620734400,
            },
            {
              begin_at: 1620732600,
              end_at: 1620736200,
            },
            {
              begin_at: 1620734400,
              end_at: 1620738000,
            },
            {
              begin_at: 1620736200,
              end_at: 1620739800,
            },
            {
              begin_at: 1620738000,
              end_at: 1620741600,
            },
            {
              begin_at: 1620739800,
              end_at: 1620743400,
            },
            {
              begin_at: 1620741600,
              end_at: 1620745200,
            },
            {
              begin_at: 1620743400,
              end_at: 1620747000,
            },
          ],
        },
      ];
      expect(reservationController.getTimeSlots(newTestCase)).toStrictEqual(
        testCaseResult,
      );
    });
    it('is_ignore_schedule: true  , is_ignore_workhour: true', () => {
      const newTestCase = {
        ...defaultTestCase,
        isIgnoreSchedule: true,
        isIgnoreWorkhour: true,
      };
      const testCaseResult = [
        {
          start_of_day: 1620486000,
          day_modifier: 0,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620486000,
              end_at: 1620489600,
            },
            {
              begin_at: 1620487800,
              end_at: 1620491400,
            },
            {
              begin_at: 1620489600,
              end_at: 1620493200,
            },
            {
              begin_at: 1620491400,
              end_at: 1620495000,
            },
            {
              begin_at: 1620493200,
              end_at: 1620496800,
            },
            {
              begin_at: 1620495000,
              end_at: 1620498600,
            },
            {
              begin_at: 1620496800,
              end_at: 1620500400,
            },
            {
              begin_at: 1620498600,
              end_at: 1620502200,
            },
            {
              begin_at: 1620500400,
              end_at: 1620504000,
            },
            {
              begin_at: 1620502200,
              end_at: 1620505800,
            },
            {
              begin_at: 1620504000,
              end_at: 1620507600,
            },
            {
              begin_at: 1620505800,
              end_at: 1620509400,
            },
            {
              begin_at: 1620507600,
              end_at: 1620511200,
            },
            {
              begin_at: 1620509400,
              end_at: 1620513000,
            },
            {
              begin_at: 1620511200,
              end_at: 1620514800,
            },
            {
              begin_at: 1620513000,
              end_at: 1620516600,
            },
            {
              begin_at: 1620514800,
              end_at: 1620518400,
            },
            {
              begin_at: 1620516600,
              end_at: 1620520200,
            },
            {
              begin_at: 1620518400,
              end_at: 1620522000,
            },
            {
              begin_at: 1620520200,
              end_at: 1620523800,
            },
            {
              begin_at: 1620522000,
              end_at: 1620525600,
            },
            {
              begin_at: 1620523800,
              end_at: 1620527400,
            },
            {
              begin_at: 1620525600,
              end_at: 1620529200,
            },
            {
              begin_at: 1620527400,
              end_at: 1620531000,
            },
            {
              begin_at: 1620529200,
              end_at: 1620532800,
            },
            {
              begin_at: 1620531000,
              end_at: 1620534600,
            },
            {
              begin_at: 1620532800,
              end_at: 1620536400,
            },
            {
              begin_at: 1620534600,
              end_at: 1620538200,
            },
            {
              begin_at: 1620536400,
              end_at: 1620540000,
            },
            {
              begin_at: 1620538200,
              end_at: 1620541800,
            },
            {
              begin_at: 1620540000,
              end_at: 1620543600,
            },
            {
              begin_at: 1620541800,
              end_at: 1620545400,
            },
            {
              begin_at: 1620543600,
              end_at: 1620547200,
            },
            {
              begin_at: 1620545400,
              end_at: 1620549000,
            },
            {
              begin_at: 1620547200,
              end_at: 1620550800,
            },
            {
              begin_at: 1620549000,
              end_at: 1620552600,
            },
            {
              begin_at: 1620550800,
              end_at: 1620554400,
            },
            {
              begin_at: 1620552600,
              end_at: 1620556200,
            },
            {
              begin_at: 1620554400,
              end_at: 1620558000,
            },
            {
              begin_at: 1620556200,
              end_at: 1620559800,
            },
            {
              begin_at: 1620558000,
              end_at: 1620561600,
            },
            {
              begin_at: 1620559800,
              end_at: 1620563400,
            },
            {
              begin_at: 1620561600,
              end_at: 1620565200,
            },
            {
              begin_at: 1620563400,
              end_at: 1620567000,
            },
            {
              begin_at: 1620565200,
              end_at: 1620568800,
            },
            {
              begin_at: 1620567000,
              end_at: 1620570600,
            },
            {
              begin_at: 1620568800,
              end_at: 1620572400,
            },
            {
              begin_at: 1620570600,
              end_at: 1620574200,
            },
          ],
        },
        {
          start_of_day: 1620572400,
          day_modifier: 1,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620572400,
              end_at: 1620576000,
            },
            {
              begin_at: 1620574200,
              end_at: 1620577800,
            },
            {
              begin_at: 1620576000,
              end_at: 1620579600,
            },
            {
              begin_at: 1620577800,
              end_at: 1620581400,
            },
            {
              begin_at: 1620579600,
              end_at: 1620583200,
            },
            {
              begin_at: 1620581400,
              end_at: 1620585000,
            },
            {
              begin_at: 1620583200,
              end_at: 1620586800,
            },
            {
              begin_at: 1620585000,
              end_at: 1620588600,
            },
            {
              begin_at: 1620586800,
              end_at: 1620590400,
            },
            {
              begin_at: 1620588600,
              end_at: 1620592200,
            },
            {
              begin_at: 1620590400,
              end_at: 1620594000,
            },
            {
              begin_at: 1620592200,
              end_at: 1620595800,
            },
            {
              begin_at: 1620594000,
              end_at: 1620597600,
            },
            {
              begin_at: 1620595800,
              end_at: 1620599400,
            },
            {
              begin_at: 1620597600,
              end_at: 1620601200,
            },
            {
              begin_at: 1620599400,
              end_at: 1620603000,
            },
            {
              begin_at: 1620601200,
              end_at: 1620604800,
            },
            {
              begin_at: 1620603000,
              end_at: 1620606600,
            },
            {
              begin_at: 1620604800,
              end_at: 1620608400,
            },
            {
              begin_at: 1620606600,
              end_at: 1620610200,
            },
            {
              begin_at: 1620608400,
              end_at: 1620612000,
            },
            {
              begin_at: 1620610200,
              end_at: 1620613800,
            },
            {
              begin_at: 1620612000,
              end_at: 1620615600,
            },
            {
              begin_at: 1620613800,
              end_at: 1620617400,
            },
            {
              begin_at: 1620615600,
              end_at: 1620619200,
            },
            {
              begin_at: 1620617400,
              end_at: 1620621000,
            },
            {
              begin_at: 1620619200,
              end_at: 1620622800,
            },
            {
              begin_at: 1620621000,
              end_at: 1620624600,
            },
            {
              begin_at: 1620622800,
              end_at: 1620626400,
            },
            {
              begin_at: 1620624600,
              end_at: 1620628200,
            },
            {
              begin_at: 1620626400,
              end_at: 1620630000,
            },
            {
              begin_at: 1620628200,
              end_at: 1620631800,
            },
            {
              begin_at: 1620630000,
              end_at: 1620633600,
            },
            {
              begin_at: 1620631800,
              end_at: 1620635400,
            },
            {
              begin_at: 1620633600,
              end_at: 1620637200,
            },
            {
              begin_at: 1620635400,
              end_at: 1620639000,
            },
            {
              begin_at: 1620637200,
              end_at: 1620640800,
            },
            {
              begin_at: 1620639000,
              end_at: 1620642600,
            },
            {
              begin_at: 1620640800,
              end_at: 1620644400,
            },
            {
              begin_at: 1620642600,
              end_at: 1620646200,
            },
            {
              begin_at: 1620644400,
              end_at: 1620648000,
            },
            {
              begin_at: 1620646200,
              end_at: 1620649800,
            },
            {
              begin_at: 1620648000,
              end_at: 1620651600,
            },
            {
              begin_at: 1620649800,
              end_at: 1620653400,
            },
            {
              begin_at: 1620651600,
              end_at: 1620655200,
            },
            {
              begin_at: 1620653400,
              end_at: 1620657000,
            },
            {
              begin_at: 1620655200,
              end_at: 1620658800,
            },
            {
              begin_at: 1620657000,
              end_at: 1620660600,
            },
          ],
        },
        {
          start_of_day: 1620658800,
          day_modifier: 2,
          is_day_off: false,
          timeslots: [
            {
              begin_at: 1620658800,
              end_at: 1620662400,
            },
            {
              begin_at: 1620660600,
              end_at: 1620664200,
            },
            {
              begin_at: 1620662400,
              end_at: 1620666000,
            },
            {
              begin_at: 1620664200,
              end_at: 1620667800,
            },
            {
              begin_at: 1620666000,
              end_at: 1620669600,
            },
            {
              begin_at: 1620667800,
              end_at: 1620671400,
            },
            {
              begin_at: 1620669600,
              end_at: 1620673200,
            },
            {
              begin_at: 1620671400,
              end_at: 1620675000,
            },
            {
              begin_at: 1620673200,
              end_at: 1620676800,
            },
            {
              begin_at: 1620675000,
              end_at: 1620678600,
            },
            {
              begin_at: 1620676800,
              end_at: 1620680400,
            },
            {
              begin_at: 1620678600,
              end_at: 1620682200,
            },
            {
              begin_at: 1620680400,
              end_at: 1620684000,
            },
            {
              begin_at: 1620682200,
              end_at: 1620685800,
            },
            {
              begin_at: 1620684000,
              end_at: 1620687600,
            },
            {
              begin_at: 1620685800,
              end_at: 1620689400,
            },
            {
              begin_at: 1620687600,
              end_at: 1620691200,
            },
            {
              begin_at: 1620689400,
              end_at: 1620693000,
            },
            {
              begin_at: 1620691200,
              end_at: 1620694800,
            },
            {
              begin_at: 1620693000,
              end_at: 1620696600,
            },
            {
              begin_at: 1620694800,
              end_at: 1620698400,
            },
            {
              begin_at: 1620696600,
              end_at: 1620700200,
            },
            {
              begin_at: 1620698400,
              end_at: 1620702000,
            },
            {
              begin_at: 1620700200,
              end_at: 1620703800,
            },
            {
              begin_at: 1620702000,
              end_at: 1620705600,
            },
            {
              begin_at: 1620703800,
              end_at: 1620707400,
            },
            {
              begin_at: 1620705600,
              end_at: 1620709200,
            },
            {
              begin_at: 1620707400,
              end_at: 1620711000,
            },
            {
              begin_at: 1620709200,
              end_at: 1620712800,
            },
            {
              begin_at: 1620711000,
              end_at: 1620714600,
            },
            {
              begin_at: 1620712800,
              end_at: 1620716400,
            },
            {
              begin_at: 1620714600,
              end_at: 1620718200,
            },
            {
              begin_at: 1620716400,
              end_at: 1620720000,
            },
            {
              begin_at: 1620718200,
              end_at: 1620721800,
            },
            {
              begin_at: 1620720000,
              end_at: 1620723600,
            },
            {
              begin_at: 1620721800,
              end_at: 1620725400,
            },
            {
              begin_at: 1620723600,
              end_at: 1620727200,
            },
            {
              begin_at: 1620725400,
              end_at: 1620729000,
            },
            {
              begin_at: 1620727200,
              end_at: 1620730800,
            },
            {
              begin_at: 1620729000,
              end_at: 1620732600,
            },
            {
              begin_at: 1620730800,
              end_at: 1620734400,
            },
            {
              begin_at: 1620732600,
              end_at: 1620736200,
            },
            {
              begin_at: 1620734400,
              end_at: 1620738000,
            },
            {
              begin_at: 1620736200,
              end_at: 1620739800,
            },
            {
              begin_at: 1620738000,
              end_at: 1620741600,
            },
            {
              begin_at: 1620739800,
              end_at: 1620743400,
            },
            {
              begin_at: 1620741600,
              end_at: 1620745200,
            },
            {
              begin_at: 1620743400,
              end_at: 1620747000,
            },
          ],
        },
      ];
      expect(reservationController.getTimeSlots(newTestCase)).toStrictEqual(
        testCaseResult,
      );
    });
  });
});
