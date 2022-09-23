import React, { useState, useEffect } from 'react';
import { Flex, FormControl, Input, Text, Button, Alert, AlertIcon } from '@chakra-ui/react';
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

  const { isLoading, isAuthenticated, error } = useSelector(state => state.auth);

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
  };

  useEffect(() => {
    if (isAuthenticated) navigate(ROUTES.HOME);
  }, [isAuthenticated, navigate]);

  return (
    <Flex direction="column">
      <FormControl>
        {emailInput && !isValidEmail && (
          <Text
            fontSize="xs"
            color="#ff0000"
            width="100%"
            align="right"
            pos="absolute"
            top="0"
            right="0"
          >
            올바른 아이디를 입력해주세요.
          </Text>
        )}
        <Input
          type="text"
          id="email"
          required
          placeholder="이메일을 입력하세요"
          onChange={handleIdChange}
          size="md"
          width="100%"
          my="1em"
        />
        {passwordInput && !isValidPassword && (
          <Text
            fontSize="xs"
            color="#f00"
            width="100%"
            align="right"
            pos="absolute"
            top="6em"
            right="0"
          >
            8글자 이상의 비밀번호를 입력해주세요.
          </Text>
        )}
        <Input
          type="password"
          id="password"
          required
          placeholder="비밀번호를 입력하세요"
          onChange={handlePasswordChange}
          size="md"
          width="100%"
          my="1em"
        />
        {isLoading ? (
          <Button isLoading colorScheme="teal" width="100%" size="md">
            로그인
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!isValidEmail || !isValidPassword}
            onClick={handleLogin}
            colorScheme="teal"
            width="100%"
            size="md"
          >
            로그인
          </Button>
        )}
        {error && (
          <Alert status="error" mt="1em" fontSize="sm">
            <AlertIcon />
            등록되지 않은 이메일이거나 이메일 또는 비밀번호를 잘못 입력했습니다.
          </Alert>
        )}
      </FormControl>
    </Flex>
  );
};

export default LoginForm;
