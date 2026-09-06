# todo-api-demo

3부 강의("AI를 활용한 협업과 코드리뷰 실전") 촬영용 실습 코드입니다. 간단한 할일 목록(Todo) API이며, PR·커밋 메시지 데모와 AI 코드리뷰(오류·보안·성능) 데모에 그대로 사용할 수 있도록 만들어졌습니다.

DB는 Node.js에 내장된 `node:sqlite` 모듈만 사용합니다. 별도 DB 서버나 네이티브 모듈 설치가 필요 없습니다 (Node.js 22.5 이상 필요).

## 실행 방법

```bash
npm install
npm start
```

`http://localhost:3000` 에서 서버가 뜨고, 처음 실행 시 `data.db` (SQLite 파일)가 자동 생성되며 샘플 데이터가 채워집니다.

> 실행 시 `SQLite is an experimental feature` 경고가 뜨는데, Node.js 자체의 경고이며 정상 동작에는 문제가 없습니다.

## API 목록

| Method | Path | 설명 |
|---|---|---|
| GET | `/todos` | 전체 할일 목록 |
| GET | `/todos?withComments=true` | 할일 목록 + 각 항목의 댓글 |
| GET | `/todos/search?keyword=` | 제목으로 검색 |
| GET | `/todos/:id` | 단건 조회 |
| POST | `/todos` | 생성 (`{ "title": "..." }`) |
| PATCH | `/todos/:id` | 완료 상태 변경 (`{ "completed": true }`) |
| DELETE | `/todos/:id` | 삭제 |
| POST | `/users/register` | 회원가입 (`{ "username": "...", "password": "..." }`) |
| POST | `/users/login` | 로그인 |

## 이 저장소를 강의에서 쓰는 법

1. **커밋 히스토리 보여주기 (4-1 구간)**: `git log --oneline` 을 실행하면 `fix`, `wip`, `수정` 같은 실제로 흔한 부실한 커밋 메시지들이 보입니다. 마지막 커밋을 골라 `git show`로 diff를 띄우고, AI에게 커밋 메시지/PR 설명을 다시 써달라고 요청하는 데모에 사용하세요.
2. **PR 설명 템플릿**: `.github/PULL_REQUEST_TEMPLATE.md` 에 강의에서 소개한 5개 항목 템플릿이 이미 들어 있습니다. GitHub에 올려서 PR을 열면 자동으로 채워집니다.
3. **오류·보안·성능 데모 (4-3 구간)**: 이 저장소에는 실전에서 자주 나오는 버그 3종이 의도적으로 심어져 있습니다. 정확한 위치와 시연 스크립트는 별도로 전달된 `INSTRUCTOR_NOTES.md` (강사용, 저장소에는 포함되지 않음)를 참고하세요.

## 주의

이 프로젝트는 교육용 데모입니다. 실제 서비스에는 절대 이 코드를 그대로 사용하지 마세요.
