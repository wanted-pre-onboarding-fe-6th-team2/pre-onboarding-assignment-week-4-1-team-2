import React from 'react';

const UserDetail = ({ user, userSetting }) => {
  return (
    <div>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
      <p>생년월일: {user.birth_date}</p>
      <p>최근 로그인: {user.last_login}</p>
      <p>가입 시각: {user.created_at}</p>
      <p>핸드폰: {user.phone_number}</p>
      <p>{user.gender_origin}</p>
      <p>이메일: {user.email}</p>
      <p>주소: {`${user.address} ${user.detail_address}`}</p>
      <p>투자 정보 수신: {userSetting.allow_invest_push ? '수신' : '미수신'}</p>
      <p>마케팅 정보 수신: {userSetting.allow_marketing_push ? '수신' : '미수신'}</p>
    </div>
  );
};

export default UserDetail;
