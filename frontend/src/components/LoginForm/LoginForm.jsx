import React, { useState } from 'react';
import { Input, Button, Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { emailValidator, passwordLengthValidator } from '@/utils/validator';
import { authActions } from '@/store/modules/auth';
import { ROUTES } from '@/constants/routes';

const LoginForm = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const { isLoading } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogin = async event => {
    event.preventDefault();

    dispatch(
      authActions.loginMiddleware({
        email: emailInput,
        password: passwordInput,
      })
    );

    navigate(ROUTES.HOME);
  };

  return (
    <Center h="100vh">
      <form>
        {emailInput && !isValidEmail && <p>올바른 아이디를 입력해주세요.</p>}
        <Input
          type="text"
          id="email"
          placeholder="이메일을 입력하세요"
          onChange={handleIdChange}
          size="md"
          mb="1em"
        />
        {passwordInput && !isValidPassword && <p>8글자 이상의 비밀번호를 입력해주세요.</p>}
        <Input
          type="text"
          id="password"
          placeholder="비밀번호를 입력하세요"
          onChange={handlePasswordChange}
          size="md"
          mb="1em"
        />
        {isLoading ? (
          <Button isLoading colorScheme="teal" width="100%" size="md">
            로그인
          </Button>
        ) : (
          <Button type="submit" onClick={handleLogin} colorScheme="teal" width="100%" size="md">
            로그인
          </Button>
        )}
      </form>
    </Center>
  );
};

export default LoginForm;
