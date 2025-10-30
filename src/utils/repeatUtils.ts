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

export function calculateWeeklyDates(
  startDate: string,
  interval: number,
  daysOfWeek: number[], // 0: 일요일, 1: 월요일, ..., 6: 토요일
  endDate: string
): string[] {
  const dates: string[] = [];
  let current = new Date(startDate + 'T00:00:00');
  const finalDate = new Date(endDate + 'T00:00:00');

  if (interval <= 0 || daysOfWeek.length === 0) {
    return [];
  }

  // 시작일이 속한 주의 시작(일요일)을 기준으로 주차 계산
  const startOfWeek = new Date(current);
  startOfWeek.setDate(current.getDate() - current.getDay()); // 일요일로 맞춤

  let weekCount = 0;

  while (current <= finalDate) {
    const dayOfWeek = current.getDay(); // 0: 일요일, 1: 월요일, ...

    // 현재 날짜가 시작일이 속한 주로부터 몇 번째 주인지 계산
    const diffTime = Math.abs(current.getTime() - startOfWeek.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const currentWeek = Math.floor(diffDays / 7);

    if (daysOfWeek.includes(dayOfWeek) && currentWeek % interval === 0) {
      dates.push(current.toISOString().split('T')[0]);
    }

    current.setDate(current.getDate() + 1); // 다음 날짜로 이동
  }

  return dates;
}
