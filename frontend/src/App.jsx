import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ROUTES } from '@/constants/routes';
import resetCss from '@/styles/reset';
import AccountList from '@/pages/AccountList/AccountList';
import Login from '@/pages/Login/Login';
import Account from '@/pages/Account/Account';
import User from '@/pages/User/User';
import UsersList from '@/pages/UsersList/UsersList';
import Logout from './pages/Logout/Logout';

const App = () => (
  <ChakraProvider>
    <Global styles={resetCss} />
    <Routes>
      <Route path={ROUTES.HOME} element={<Login />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.LOGOUT} element={<Logout />} />
      <Route path={ROUTES.ACOOUNTS} element={<AccountList />} />
      <Route path={`${ROUTES.ACCOUNT}/:accountId`} element={<Account />} />
      <Route path={`${ROUTES.USER}/:userId`} element={<User />} />
      <Route path={ROUTES.USERSLIST} element={<UsersList />} />
    </Routes>
  </ChakraProvider>
);

export default App;
