import React, { useState } from 'react';

const LoginForm = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const emailValidator = email => {
    const regEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    return regEmail.test(email);
  };

  const passwordLengthValidator = (password, minLength) => {
    return password.length >= minLength;
  };

  const handleIdChange = event => {
    const { value } = event.target;
    setEmailInput(value);
    setIsValidEmail(emailValidator(value));
  };

  const handlePasswordChange = event => {
    const { value } = event.target;
    setPasswordInput(value);
    setIsValidPassword(passwordLengthValidator(value, 8));
  };

  return (
    <form>
      {emailInput && !isValidEmail && <p>올바른 아이디를 입력해주세요.</p>}
      <input type="text" id="email" placeholder="아이디를 입력하세요" onChange={handleIdChange} />
      {passwordInput && !isValidPassword && <p>8글자 이상의 비밀번호를 입력해주세요.</p>}
      <input
        type="text"
        id="password"
        placeholder="비밀번호를 입력하세요"
        onChange={handlePasswordChange}
      />
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
