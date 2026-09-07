---
name: pr-description
description: Use this skill to write or update a pull request description for the todo-api-demo repo. Builds the description from the actual diff against the base branch (not from commit messages, which are typically terse/inaccurate here) and fills in the project's existing PR template in Korean.
---

# PR 설명 작성 (todo-api-demo)

이 저장소의 PR 설명을 작성할 때 따르는 절차입니다. "PR 설명 써줘", "PR 본문 작성해줘" 같은 요청에 사용하세요.

## 1. 절대 커밋 메시지만 보고 쓰지 않는다

이 저장소의 커밋 메시지는 신뢰할 수 없습니다. 실제 히스토리 예시:

```
bfd3a31 기능 추가
de40575 수정
bf44972 wip
2456a1f fix
b777c1c todo 기능 추가
```

`기능 추가`, `수정`, `wip`, `fix` 같은 메시지는 실제로 무엇이 바뀌었는지 전혀 알려주지 않습니다. 커밋 로그는 "몇 번 커밋했는지" 정도만 참고하고, **PR 설명의 내용은 반드시 실제 diff를 읽고** 작성합니다.

```bash
git log <base>..HEAD --oneline   # 참고용, 신뢰하지 않음
git diff <base>...HEAD           # 실제 근거
```

## 2. base 브랜치와 작업 트리 상태를 먼저 확인한다

- 이 저장소는 `main`에서 여러 `feature/*` 브랜치가 갈라져 나옵니다. PR을 만들 base가 `main`이 맞는지 확인하세요 (`git log --oneline --graph --all`로 분기점 확인).
- **커밋된 것만 보지 말고 작업 트리도 확인**하세요. 이 저장소에서는 보안 수정처럼 중요한 변경이 커밋되지 않은 채 working tree에만 남아있던 사례가 있었습니다 (예: `/todos/search`의 SQL 인젝션을 파라미터 바인딩으로 고친 수정, `GET /todos/:id` 404 처리 추가). `git status`, `git diff HEAD`로 미커밋 변경을 반드시 확인하고, 있다면 PR 대상에 포함할지 사용자에게 확인하세요.
- `server-err.log`, `server-out.log` 같은 실행 부산물이나 `.claude/` 같은 도구 설정 디렉터리가 `git status`에 untracked로 잡히는 경우가 있습니다. 이런 파일이 실수로 스테이징되지 않았는지 확인하고, PR 범위에 포함할 의도가 아니라면 언급하세요.

## 3. 기존 템플릿을 그대로 채운다

`.github/PULL_REQUEST_TEMPLATE.md`에 정해진 구조가 있으므로 새로 만들지 말고 그대로 채웁니다:

```markdown
## 변경 사항


## 배경 및 이유


## 테스트 방법


## 리뷰 포인트


## 스크린샷 (필요시)
```

섹션별 작성 기준:

- **변경 사항**: 커밋 단위가 아니라 파일/기능 단위로 정리 (예: "users 라우터 추가(회원가입/로그인)", "todos 조회 시 댓글 포함 옵션 추가"). diff에서 확인한 사실만 적습니다.
- **배경 및 이유**: "왜" 이 변경이 필요했는지. 버그 수정이면 어떤 문제였는지(예: 평문 비밀번호 저장, N+1 쿼리로 인한 성능 저하), 기능 추가면 어떤 요구사항인지. 대화나 커밋에 이유가 명시되어 있지 않으면 추측해서 쓰지 말고 사용자에게 물어봅니다.
- **테스트 방법**: 이 프로젝트는 UI가 없는 API 서버이고 자동화된 테스트 스크립트도 없습니다(`package.json`에 `test` 스크립트 없음). "스크린샷" 대신 실제로 검증한 `curl` 요청/응답 예시를 넣거나, 어떻게 수동으로 확인했는지(혹은 확인이 필요한지)를 명시하세요.
- **리뷰 포인트**: 이 저장소는 보안 이슈(평문 비밀번호, SQL 인젝션)가 실제로 있었던 이력이 있습니다. 인증, 비밀번호, SQL 쿼리 문자열 조합, 사용자 입력이 그대로 쿼리에 들어가는지 등 민감한 부분은 "이 부분 특히 봐주세요" 식으로 명시적으로 짚어줍니다.
- **스크린샷 (필요시)**: 백엔드 API 전용 변경이면 "해당 없음(백엔드 API 변경)"으로 표기. 실제 UI가 추가된 경우에만 채웁니다.

## 4. 언어와 톤

- 팀 컨벤션에 맞춰 **한국어**로 작성합니다.
- 이 저장소는 강의 실습용 데모(`package.json`의 `description: "3부 강의 실습용 할일 목록(Todo) API 데모 프로젝트"`)이므로, 리뷰어가 학습자일 수 있다는 점을 감안해 간결하고 명확하게 씁니다. 과장하거나 diff에 없는 내용을 추가하지 않습니다.
