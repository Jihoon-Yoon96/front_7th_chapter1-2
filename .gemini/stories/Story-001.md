# Story 1: '매일' 반복 일정 생성 로직 [RED] 단계 구현

## Rules to Follow
This task *must* be executed according to the following 3 official rule documents:
1.  `docs/kentcdodds-rtl-rules.md`
2.  `docs/rtl-official-query-guide.md`
3.  `docs/tidy-first-tdd-workflow.md`

---
## User Story (From PRD)
- 사용자는 일정을 생성하거나 수정할 때, 반복 옵션을 선택하여 동일한 일정을 주기적으로 생성할 수 있다.

## Acceptance Criteria (From PRD)
- [ ] '매일' 옵션, 간격(예: 2), 종료일(예: '2025-12-31') 선택 시, 해당 기간 동안 이틀에 한 번씩 일정이 생성되어야 한다.

## Architecture (From Architecture.md)
- **저장 방식:** 개별 인스턴스 저장 방식 채택.
- **데이터:** 생성되는 모든 일정은 고유 `id`와 동일한 `seriesId`를 가져야 한다.
- **구현 위치:** `src/utils/repeatUtils.ts` (신규) 파일에 관련 로직 함수 구현 제안됨.

## File Paths
- **신규 생성:** `src/utils/repeatUtils.ts`
- **신규 생성:** `src/__tests__/utils/repeatUtils.spec.ts`

---
## Commit Messages
- **[Tidy]**: `N/A` (새 파일 생성 단계)
- **[RED]**: `test(repeat): Add failing test for daily repeat event generation`
- **[GREEN]**: `feat(repeat): Implement daily repeat event generation logic`
- **[REFACTOR]**: `refactor(repeat): Improve clarity of daily repeat generation code`
