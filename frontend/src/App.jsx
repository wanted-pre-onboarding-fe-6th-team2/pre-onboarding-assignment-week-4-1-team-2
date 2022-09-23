import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import resetCss from '@/styles/reset';
import Home from '@/pages/Home/Home';
import Account from '@/pages/Account/Account';
import User from '@/pages/User/User';
import { ROUTES } from '@/constants/routes';

const App = () => (
  <div>
    <Global styles={resetCss} />
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={`${ROUTES.ACCOUNT}/:accountId`} element={<Account />} />
      <Route path={`${ROUTES.USER}/:userId`} element={<User />} />
    </Routes>
  </div>
);

export default App;
