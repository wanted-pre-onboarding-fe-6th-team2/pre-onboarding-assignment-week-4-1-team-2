import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Alert, AlertIcon } from '@chakra-ui/react';
import LoginForm from '@/components/LoginForm/LoginForm';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { ROUTES } from '@/constants/routes';

const Login = () => {
  const [isShown, setIsShown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    setIsShown(!hasToken);
    if (hasToken) navigate(ROUTES.HOME);
  }, [navigate]);

  return (
    <Container maxW="md" centerContent>
      {isShown && (
        <Alert status="warning">
          <AlertIcon />
          세션이 만료되었습니다. 다시 로그인해주세요.
        </Alert>
      )}
      <LoginForm />
    </Container>
  );
};

export default Login;
