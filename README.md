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

- ###

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
src


```

<br/>

> ## 과제 요구사항 및 해결 방법

### 사용자 목록-검색

- **해결방법**

- **트러블 슈팅**

-

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

- **해결방법**

- **트러블 슈팅**

-

> ## 기술 스택

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-D26AC2?style=for-the-badge&logo=emotion&logoColor=white)
