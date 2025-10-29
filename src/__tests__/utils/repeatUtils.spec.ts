// src/__tests__/utils/repeatUtils.spec.ts
import { calculateDailyDates } from '../../utils/repeatUtils';

describe('calculateDailyDates', () => {
  it('should generate daily repeating dates correctly with interval 1 until end date', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-03';
    const interval = 1;
    const expectedDates = ['2025-11-01', '2025-11-02', '2025-11-03'];
    // 이 테스트는 calculateDailyDates 함수가 아직 없으므로 실패해야 합니다.
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });

  it('should generate daily repeating dates correctly with interval 2 until end date', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-05';
    const interval = 2;
    const expectedDates = ['2025-11-01', '2025-11-03', '2025-11-05'];
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });

  it('should return an empty array if interval is 0 or less', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-05';
    const interval = 0;
    const expectedDates: string[] = [];
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });

  it('should handle start date and end date being the same', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-01';
    const interval = 1;
    const expectedDates = ['2025-11-01'];
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });

  it('should not generate dates beyond the end date', () => {
    const startDate = '2025-11-01';
    const endDate = '2025-11-02';
    const interval = 2;
    const expectedDates = ['2025-11-01'];
    expect(calculateDailyDates(startDate, interval, endDate)).toEqual(expectedDates);
  });
});
