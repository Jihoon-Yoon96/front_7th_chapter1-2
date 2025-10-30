# Story 6: 반복 일정 상세 정보 저장 로직 구현

## Rules to Follow
This task *must* be executed according to the following 3 official rule documents:
1.  `docs/kentcdodds-rtl-rules.md`
2.  `docs/rtl-official-query-guide.md`
3.  `docs/tidy-first-tdd-workflow.md`

---
## User Story (From PRD)
- 사용자는 일정 생성/수정 시 선택한 반복 유형에 따라 상세 반복 정보(요일, 일자, 월)가 올바르게 저장되도록 할 수 있다.

## Acceptance Criteria
- [ ] `addOrUpdateEvent` 함수 호출 시, `repeat` 객체에 `repeatType`이 'weekly'일 경우 `daysOfWeek`가 포함되어야 한다.
- [ ] `addOrUpdateEvent` 함수 호출 시, `repeat` 객체에 `repeatType`이 'monthly'일 경우 `dayOfMonth`가 포함되어야 한다.
- [ ] `addOrUpdateEvent` 함수 호출 시, `repeat` 객체에 `repeatType`이 'yearly'일 경우 `monthOfYear`와 `dayOfMonth`가 포함되어야 한다.
- [ ] `repeatType`이 'none'일 경우 `daysOfWeek`, `dayOfMonth`, `monthOfYear`는 포함되지 않아야 한다.

## Architecture
- `src/App.tsx`의 `addOrUpdateEvent` 함수를 수정하여 `eventData.repeat` 객체에 `daysOfWeek`, `dayOfMonth`, `monthOfYear`를 조건부로 추가한다.

## File Paths (통합 테스트)
- **수정:** `src/App.tsx`
- **수정:** `src/__tests__/medium.integration.spec.tsx` (통합 테스트 파일)

---
## Test Progression Order (테스트 진행 순서)
- **1. 단위 테스트 (Unit Test) TDD 사이클:** 이 스토리는 UI와 저장 로직의 연동이 주 목적이므로, 별도의 순수 로직 단위 테스트는 생략합니다.
- **2. 통합 테스트 (Integration Test) TDD 사이클:** `addOrUpdateEvent` 함수가 반복 상세 정보를 올바르게 구성하여 `saveEvent`를 호출하는지 검증하는 통합 테스트 TDD 사이클(RED-GREEN-REFACTOR)을 진행합니다.

## UI Flow for Integration Test (통합 테스트용 UI 플로우)
- 일정 생성/수정 폼에서 '반복' 체크박스를 클릭한다.
- '반복 유형' 셀렉트 박스에서 '매주'를 선택하고, '월', '수' 요일을 선택한 후 '일정 추가' 버튼을 클릭한다.
- '반복 유형' 셀렉트 박스에서 '매월'을 선택하고, '일자' 필드에 '15'를 입력한 후 '일정 추가' 버튼을 클릭한다.
- '반복 유형' 셀렉트 박스에서 '매년'을 선택하고, '월' 필드에 '2', '일자' 필드에 '29'를 입력한 후 '일정 추가' 버튼을 클릭한다.

## Integration Test Requirement (통합 테스트 필요)
- 예, UI 상호작용 및 `addOrUpdateEvent` 로직의 연동을 포함하므로 통합 테스트가 필요합니다. 관련 테스트 파일: `src/__tests__/medium.integration.spec.tsx`

---
## Commit Messages (통합 테스트 - 반복 상세 정보 저장)
- **[Tidy]**: `N/A`
- **[RED]**: `test(eventForm): Add failing integration test for saving recurrence details`
- **[GREEN]**: `feat(eventForm): Implement saving recurrence details`
- **[REFACTOR]**: `refactor(eventForm): Improve clarity of recurrence details saving logic`
