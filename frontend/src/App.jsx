import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ROUTES } from '@/constants/routes';
import resetCss from '@/styles/reset';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import UsersList from '@/pages/UsersList/UsersList';

const App = () => (
  <ChakraProvider>
    <Global styles={resetCss} />
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.USERSLIST} element={<UsersList />} />
    </Routes>
  </ChakraProvider>
);

export default App;
