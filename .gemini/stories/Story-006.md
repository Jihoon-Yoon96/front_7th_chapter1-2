# Story 6: 반복 일정 시각적 표시 구현

## Rules to Follow
This task *must* be executed according to the following 3 official rule documents:
1.  `docs/kentcdodds-rtl-rules.md`
2.  `docs/rtl-official-query-guide.md`
3.  `docs/tidy-first-tdd-workflow.md`

---
## User Story (From PRD)
- 사용자는 캘린더에서 어떤 일정이 반복되는 일정인지 한눈에 알아볼 수 있다.

## Acceptance Criteria
- [ ] 캘린더 뷰에 표시되는 반복 일정에는 시각적 표시(예: 아이콘)가 포함되어야 한다.
- [ ] 반복되지 않는 일정에는 해당 아이콘이 표시되지 않아야 한다.

## Architecture
- `src/App.tsx`의 일정 렌더링 부분을 수정하여, `event.repeat.type`이 'none'이 아닐 경우 반복 아이콘(예: `<ReplayIcon />`)을 조건부로 렌더링한다.

## File Paths (통합 테스트)
- **수정:** `src/App.tsx`
- **수정:** `src/__tests__/medium.integration.spec.tsx` (통합 테스트 파일)

---
## Test Progression Order (테스트 진행 순서)
- **1. 단위 테스트 (Unit Test) TDD 사이클:** 이 스토리는 UI 렌더링 로직이 핵심이므로, 별도의 순수 로직 단위 테스트는 생략합니다.
- **2. 통합 테스트 (Integration Test) TDD 사이클:** 일정이 반복될 때 아이콘이 올바르게 표시되는지 검증하는 통합 테스트 TDD 사이클(RED-GREEN-REFACTOR)을 진행합니다.

## UI Flow for Integration Test (통합 테스트용 UI 플로우)
- MSW를 사용하여 반복 일정이 포함된 목(mock) 데이터를 반환하도록 설정한다.
- 앱이 렌더링된 후, 반복 일정이 포함된 리스트 아이템 내에 반복 아이콘이 존재하는지 확인한다.
- 반복되지 않는 일정에는 아이콘이 없는지 확인한다.

## Integration Test Requirement (통합 테스트 필요)
- 예, UI 렌더링 및 조건부 로직을 포함하므로 통합 테스트가 필요합니다. 관련 테스트 파일: `src/__tests__/medium.integration.spec.tsx`

---
## Commit Messages (통합 테스트 - 반복 아이콘 표시)
- **[Tidy]**: `N/A`
- **[RED]**: `test(event): Add failing integration test for displaying recurrence icon`
- **[GREEN]**: `feat(event): Display icon for recurring events`
- **[REFACTOR]**: `refactor(event): Improve recurrence icon display logic`