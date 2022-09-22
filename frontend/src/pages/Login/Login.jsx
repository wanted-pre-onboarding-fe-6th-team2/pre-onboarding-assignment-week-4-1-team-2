import { Container } from '@chakra-ui/react';
import LoginForm from '@/components/LoginForm/LoginForm';

const Login = () => {
  return (
    <Container maxW="md" centerContent>
      <LoginForm />
    </Container>
  );
};

export default Login;
