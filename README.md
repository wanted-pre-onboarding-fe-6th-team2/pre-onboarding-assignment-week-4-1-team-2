# 원티드 프리온보딩 5차 과제(디셈버앤컴퍼니(핀트))

> ## 2팀 소개

<table>
  <tr>
    <td height="50px" align="center"><a href="https://github.com/nknkcho">조남경<br>(팀장)</a></td>
    <td height="50px" align="center"><a href="https://github.com/
hyoungqu23">이형민</a></td>
    <td height="50px" align="center"><a href="https://github.com/hasunghwa">하성화</a></td>
    <td height="50px" align="center"><a href="https://github.com/HaJunRyu">류하준</a></td>
    <td height="50px" align="center"><a href="https://github.com/
wldbszpflrxj">변지윤</a></td>
  </tr>
  <tr>
    <td align="center">사용자 목록-검색</td>
    <td align="center">로그인, 사용자 상세, 계좌 상세</td>
    <td align="center">공통 컴포넌트-Layout, Pagenation</td>
    <td align="center">API 호출 및 Redux 연결</td>
    <td align="center">계좌 목록-검색</td>
  </tr>
</table>

> ## 데모

- ### 계좌 목록
- <video src='https://user-images.githubusercontent.com/72956443/192097614-09051b5d-1d1c-49c9-9e6f-0d955d167ae1.mp4' width=100% />

> ## 테스트 계정

- email: pre-onboarding-team2@wanted.com
- password: qwer1234

> ## 실행 방법

```sh
yarn install

yarn workspace backend start

# 새로운 터미널에서
yarn workspace frontend dev
```

> ## 목차

- [과제 내용](#과제-내용)
- [폴더 구조](#폴더-구조)
- [과제 요구사항 및 해결 방법](#과제-요구사항-및-해결-방법)
- [기술 스택](#기술-스택)

> ## 과제 내용

원티드 프리온보딩 프론트엔드 기업 협업 과제 - 디셈버앤컴퍼니(핀트)

- ### 주제

  - 투자 관리 서비스의 관리자 기능 구현

- ### 기간
  - 2022년 9월 20일 ~ 9월 25일

> ## 폴더 구조

```
📦
├─api
├─assets
├─components
│  ├─account
│  │  ├─AccountDetail
│  │  └─UserName
│  ├─accountList
│  │  ├─AccountListBoard
│  │  └─AccountUserName
│  ├─common
│  │  ├─AccountNumber
│  │  ├─AccountStatus
│  │  ├─BrokerName
│  │  ├─InnerHeading
│  │  ├─Layout
│  │  │  ├─Footer
│  │  │  ├─Header
│  │  │  └─Sidebar
│  │  └─Pagination
│  ├─LoginForm
│  ├─Search
│  ├─user
│  │  ├─AccountNameLink
│  │  ├─UserAccounts
│  │  └─UserDetail
│  └─UsersListBoard
├─constants
├─hooks
├─pages
│  ├─Account
│  ├─AccountList
│  ├─Home
│  ├─Login
│  ├─Logout
│  ├─User
│  └─UsersList
├─store
│  └─modules
├─styles
└─utils

```

<br/>

> ## 과제 요구사항 및 해결 방법

### 사용자 목록-검색

**해결방법**

- react-table 라이브러리를 활용해 사용자 리스트 구현
- 현재 페이지 내 전체 데이터를 받아온 이후, 별도의 API 호출로 리스트 데이터 추가(보유 중인 계좌수, 혜택 수신 동의 여부, 활성화 여부)
- 과제 조건에 맞는 데이터 가공 처리(고객명 및 휴대폰 번호 마스킹, 생년월일 및 최근 로그인, 가입일 일자 yyyy-mm--dd 형식)
- 신규 사용자 생성 폼 구현, 생성 폼은 별도의 페이지 분할 없이 모달 창으로 업로드 되도록 처리
- 잘못 생성된 사용자 삭제 기능 구현
- 사용자 명 변경 시 테이블에서 바로 수정할 수 있도록 구현

**트러블 슈팅**

- 유저 데이터 API 콜 이후 다른 API 데이터와 합치기 위해 map 함수 내 API 콜 비동기 처리 및 Promise.all 처리. 함수 재사용성을 높이기 위해 useCallback 훅 사용
- 신규 사용자 첫 생성 이후 추가 제출 시 400 에러가 뜨는 현상을 발견, 해당 에러는 중복된 데이터를 POST 했을 시 서버 단에서 클라이언트의 요청을 거절한다는 의미이며 테스트용으로 데이터를 일부만 변경해서 생성했던 것이 에러의 원인인 것으로 파악

### 로그인

**해결방법**

- 토큰 만료 시 알림 메시지 구현
- 로그인 폼에 입력된 값을 기반으로 로그인 API 호출 및 로그인 처리
- 관련 Redux 및 Redux-persist 로직으로 로그인 유지 처리
- 로그인 validation 로직 추가
- validation 기준 미충족 시 경고 메시지 구현
- 로그인 상태(토큰 존재)인 경우 HOME으로 이동
- Chakra UI를 활용해 UI 구현

**트러블 슈팅**

- 토큰 여부에 따른 라우트 관련 커스텀 훅을 추가했다가 해당 부분은 API catch 로직으로 처리하기로 결정하여 제거

### 사용자 상세, 계좌 상세

**해결방법**

- URL의 `params`를 활용해 해당 `userId`, ``accountId`를 기반으로 API 호출을 하는 방식으로 사용자 상세 페이지, 계좌 상세 페이지를 구현
- Chakra UI Table Component를 활용해 사용자 상세 페이지와 계좌 상세 페이지 UI를 구현
- `moment.js` 패키지를 활용해 날짜 관련 형식을 통일
- 계좌 상세 페이지에서 해당 계좌를 보유한 고객명을 클릭하는 경우 해당 사용자 상세 페이지로 이동할 수 있도록 `Link` Tag로 처리
- 사용자 상세 페이지 하단에 해당 사용자가 보유한 계좌 목록을 추가
- 사용자 상세 페이지 하단의 보유 계좌 목록에서 해당 계좌명을 클릭하는 경우 해당 계좌 상세 페이지로 이동할 수 있도록 `Link` Tag로 처리
- 각종 재사용되는 로직이나 컴포넌트는 분리하여 구현

**트러블 슈팅**

- 데이터 형식 처리 및 마스킹 처리는 팀원들이 만든 커스텀 훅을 재사용해서 처리( @nknkcho, @wldbszpflrxj)

### 공통 컴포넌트-Layout, Pagenation

- **해결방법**

- **트러블 슈팅**

-

### API 호출 및 Redux 연결

- **해결방법**

- **트러블 슈팅**

-

### 계좌 목록-검색

**해결방법**

- 고객 ID를 기반으로 json 데이터를 참조하여 실제 이름으로 노출 및 클릭 시 사용자 상세화면을 이동
- 브로커 ID를 기반으로 json 데이터를 참조하여 실제 증권사 이름이 노출될 수 있도록 데이터 매칭
- 계좌 상태 ID를 기반으로 json 데이터를 참조하여 상태값 매칭
- 계좌번호를 증권사 별 포맷에 맞춰 보여질 수 있도록 substring을 통해 구현 및 마스킹 처리
- 계좌명, 평가금액, 입금금액, 계좌 활성화 여부, 계좌 개설일 노출
- 브로커명, 계좌 활성화 여부, 상태에 따라 정렬되며 오름차순, 내림차순 가능하도록 server json 의 filter와 sort 기능을 사용하여 구현
- server json의 Full-text search api 를 사용하여 검색 기능 구현
- 페이지네이션 구현

**트러블 슈팅**

- 증권사별 계좌번호 포맷이 달라 하이픈(-)을 기준으로 split과 substring 메서드를 통해 마스킹 처리를 한 후 형식을 맞춰주었다.

> ## 기술 스택

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-D26AC2?style=for-the-badge&logo=emotion&logoColor=white)
![chakra](https://img.shields.io/badge/Chakra_UI-319795?style=for-the-badge&logo=chakra&logoColor=white)
