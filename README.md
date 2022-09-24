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
    <td align="center">로그인-/login, 상세-사용자, 계좌</td>
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

- **해결방법**

- **트러블 슈팅**

-

### 로그인-/login, 상세-사용자, 계좌

- **해결방법**

- **트러블 슈팅**

-

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
