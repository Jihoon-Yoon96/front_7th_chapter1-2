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

export function calculateMonthlyDates(
  startDate: string,
  interval: number,
  dayOfMonth: number,
  endDate: string
): string[] {
  const dates: string[] = [];
  let current = new Date(startDate + 'T00:00:00');
  const finalDate = new Date(endDate + 'T00:00:00');

  if (interval <= 0 || dayOfMonth <= 0 || dayOfMonth > 31) {
    return [];
  }

  // 시작일로부터 첫 번째 유효한 반복 날짜를 찾습니다.
  // dayOfMonth를 기준으로 첫 번째 날짜를 설정합니다.
  let tempDate = new Date(current.getFullYear(), current.getMonth(), dayOfMonth);

  // tempDate가 시작일보다 이전이거나, dayOfMonth가 해당 월에 유효하지 않아 월이 넘어간 경우
  // (예: 1월 31일 시작인데 2월 31일로 설정되어 3월 3일이 된 경우)
  // 또는 시작일의 일자가 dayOfMonth보다 큰 경우 (예: 1월 20일 시작, dayOfMonth 15일)
  // 다음 유효한 월로 이동합니다.
  while (tempDate < current || tempDate.getDate() !== dayOfMonth) {
    tempDate.setMonth(tempDate.getMonth() + 1);
    tempDate.setDate(dayOfMonth); // dayOfMonth를 다시 설정하여 오버플로우 처리
  }

  // interval을 고려하여 tempDate를 조정합니다.
  // (예: 1월 15일 시작, interval 3개월, dayOfMonth 15일 -> 첫 발생은 1월 15일이 아니라 4월 15일)
  let monthsSinceStart = (tempDate.getFullYear() - current.getFullYear()) * 12 + (tempDate.getMonth() - current.getMonth());
  if (monthsSinceStart % interval !== 0) {
    tempDate.setMonth(tempDate.getMonth() + (interval - (monthsSinceStart % interval)));
    tempDate.setDate(dayOfMonth);
  }


  // 메인 루프
  while (tempDate <= finalDate) {
    // 해당 월에 dayOfMonth가 유효한 날짜인지 확인 (예: 2월 31일은 생성 안 됨)
    // Date 객체는 유효하지 않은 날짜를 자동으로 다음 달로 넘기므로,
    // dayOfMonth를 설정한 후 다시 getDate()를 했을 때 dayOfMonth와 다르면 유효하지 않은 날짜임.
    const checkDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), dayOfMonth);
    if (checkDate.getDate() === dayOfMonth) { // dayOfMonth가 해당 월에 유효한 경우
      dates.push(checkDate.toISOString().split('T')[0]);
    }

    // 다음 반복 월로 이동
    tempDate.setMonth(tempDate.getMonth() + interval);
    // dayOfMonth를 다시 설정하여 월별 일수가 다른 경우(예: 31일이 없는 달) 오버플로우 처리
    tempDate.setDate(dayOfMonth);
  }

  return dates;
}
