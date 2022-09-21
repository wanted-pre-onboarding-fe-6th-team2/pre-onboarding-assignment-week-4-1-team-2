import React from 'react';

const LoginForm = () => {
  return (
    <form>
      <input type="text" placeholder="아이디를 입력하세요" />
      <input type="text" placeholder="비밀번호를 입력하세요" />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
