import React from 'react';
import { Container } from '@chakra-ui/react';
import LoginForm from '@/components/LoginForm/LoginForm';

const Login = () => {
  return (
    <Container maxW="md" height="100vh" display="flex" alignItems="center">
      <LoginForm />
    </Container>
  );
};

export default Login;
