# todo-api-demo

"AI를 활용한 협업과 코드리뷰 실전" 강의 실습용 할일 목록(Todo) API입니다. PR·커밋 메시지 작성, AI에게 코드리뷰를 요청하는 실습에 사용합니다.

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

## PR 설명 템플릿

`.github/PULL_REQUEST_TEMPLATE.md` 에 강의에서 소개한 5개 항목(변경 사항 / 배경 및 이유 / 테스트 방법 / 리뷰 포인트 / 스크린샷) 템플릿이 들어 있습니다. GitHub에 PR을 올리면 자동으로 채워집니다.

## 주의

이 프로젝트는 교육용 데모입니다. 실제 서비스에는 절대 이 코드를 그대로 사용하지 마세요.
