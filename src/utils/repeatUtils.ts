/**
 * 시작일, 간격, 종료일을 기준으로 매일 반복되는 날짜 배열을 생성합니다.
 * @param startDate 시작일 (YYYY-MM-DD)
 * @param interval 반복 간격 (일)
 * @param endDate 종료일 (YYYY-MM-DD)
 * @returns 날짜 문자열 배열 (YYYY-MM-DD)
 */
export function calculateDailyDates(startDate: string, interval: number, endDate: string): string[] {
  const dates: string[] = [];
  let currentDate = new Date(startDate + 'T00:00:00'); // 시간 정보 추가하여 정확성 확보
  const finalDate = new Date(endDate + 'T00:00:00');

  if (interval <= 0) { // 방어 코드 추가
    return [];
  }

  while (currentDate <= finalDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    // Date 객체를 직접 수정하여 루프마다 새 객체 생성을 피함
    currentDate.setDate(currentDate.getDate() + interval);
  }
  return dates;
}

export function calculateWeeklyDates(): string[] {
  return []; // Placeholder for RED stage
}
