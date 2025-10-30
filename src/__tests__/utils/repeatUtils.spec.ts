// src/__tests__/utils/repeatUtils.spec.ts
import { calculateDailyDates, calculateWeeklyDates } from '../../utils/repeatUtils';
import { afterEach } from 'vitest';

describe('calculateDailyDates', () => {
  it('간격이 1일 때 종료일까지 매일 반복되는 날짜를 올바르게 생성해야 한다', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-03';
    const interval = 1;
    const expectedDates = ['2025-11-01', '2025-11-02', '2025-11-03'];
    // 이 테스트는 calculateDailyDates 함수가 아직 없으므로 실패해야 합니다.
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });

  it('간격이 2일 때 종료일까지 격일로 반복되는 날짜를 올바르게 생성해야 한다', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-05';
    const interval = 2;
    const expectedDates = ['2025-11-01', '2025-11-03', '2025-11-05'];
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });

  it('간격이 0 이하일 경우 빈 배열을 반환해야 한다', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-05';
    const interval = 0;
    const expectedDates: string[] = [];
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });

  it('시작일과 종료일이 같을 때를 처리해야 한다', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-01';
    const interval = 1;
    const expectedDates = ['2025-11-01'];
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });

  it('종료일을 초과하는 날짜를 생성하지 않아야 한다', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-02';
    const interval = 2;
    const expectedDates = ['2025-11-01'];
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });
}); // calculateDailyDates describe 블록 종료

describe('calculateWeeklyDates', () => {
  let start = '2025-11-01';
  let end = '2025-11-07';

  afterEach(()=>{
    // 공통변수 초기화
    start = '2025-11-01';
    end = '2025-11-07';
})

  it('간격이 1이고 특정 요일이 선택되었을 때 매주 반복되는 날짜를 올바르게 생성해야 한다', () => {
    const startDate = '2025-11-03'; // 월요일
    const endDate = '2025-11-10';
    const interval = 1;
    const daysOfWeek = [1]; // 월요일
    const expectedDates = ['2025-11-03', '2025-11-10'];
    expect(calculateWeeklyDates(startDate, interval, daysOfWeek, endDate)).toEqual(expectedDates);
  });

  it('간격이 2이고 특정 요일이 선택되었을 때 격주로 반복되는 날짜를 올바르게 생성해야 한다', () => {
    const startDate = '2025-11-03'; // 월요일
    const endDate = '2025-11-17';
    const interval = 2;
    const daysOfWeek = [1]; // 월요일
    const expectedDates = ['2025-11-03', '2025-11-17']; // 2주 간격 월요일
    expect(calculateWeeklyDates(startDate, interval, daysOfWeek, endDate)).toEqual(expectedDates);
  });

  it('간격이 0 이하일 경우 빈 배열을 반환해야 한다', () => {
    const startDate = '2025-11-03';
    const endDate = '2025-11-10';
    const interval = 0; // Invalid interval
    const daysOfWeek = [1]; // 월요일
    const expectedDates: string[] = [];
    expect(calculateWeeklyDates(startDate, interval, daysOfWeek, endDate)).toEqual(expectedDates);
  });

  it('시작일과 종료일이 같을 때를 처리해야 한다', () => {
    const startDate = '2025-11-03'; // 월요일
    const endDate = '2025-11-03';
    const interval = 1;
    const daysOfWeek = [1]; // 월요일
    const expectedDates = ['2025-11-03'];
    expect(calculateWeeklyDates(startDate, interval, daysOfWeek, endDate)).toEqual(expectedDates);
  });

  it('종료일을 초과하는 날짜를 생성하지 않아야 한다', () => {
    const startDate = '2025-11-03'; // 월요일
    const endDate = '2025-11-04'; // 화요일
    const interval = 1;
    const daysOfWeek = [1]; // 월요일
    const expectedDates = ['2025-11-03'];
    expect(calculateWeeklyDates(startDate, interval, daysOfWeek, endDate)).toEqual(expectedDates);
  });

  it('선택된 요일이 시작일 이전에 있을 경우 시작일부터 일정을 생성해야 한다', () => {
    const startDate = '2025-11-05'; // 수요일
    const endDate = '2025-11-12';
    const interval = 1;
    const daysOfWeek = [1]; // 월요일 (시작일 이전)
    const expectedDates = ['2025-11-10']; // 다음 월요일부터 시작
    expect(calculateWeeklyDates(startDate, interval, daysOfWeek, endDate)).toEqual(expectedDates);
  });



describe('calculateMonthlyDates', () => {
  it('간격이 1이고 특정 일자가 선택되었을 때 매월 반복되는 날짜를 올바르게 생성해야 한다', () => {
    const startDate = '2025-01-15';
    const endDate = '2025-03-15';
    const interval = 1;
    const dayOfMonth = 15;
    const expectedDates = ['2025-01-15', '2025-02-15', '2025-03-15'];
    expect(calculateMonthlyDates(startDate, interval, dayOfMonth, endDate)).toEqual(expectedDates);
  });
});
