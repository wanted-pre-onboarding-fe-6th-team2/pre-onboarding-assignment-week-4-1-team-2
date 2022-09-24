import React from 'react';
import { Container } from '@chakra-ui/react';
import LoginForm from '@/components/LoginForm/LoginForm';
import Layout from '@/components/common/Layout/Layout';

const Login = () => {
  return (
    <Layout>
      <Container maxW="md" height="100vh" display="flex" alignItems="center">
        <LoginForm />
      </Container>
    </Layout>
  );
};

export default Login;
