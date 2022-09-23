import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import resetCss from '@/styles/reset';
import Home from '@/pages/Home/Home';
import AccountDetail from '@/pages/AccountDetail/AccountDetail';
import UserDetail from '@/pages/UserDetail/UserDetail';
import { ROUTES } from '@/constants/routes';

const App = () => (
  <div>
    <Global styles={resetCss} />
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={`${ROUTES.ACCOUNT_DETAIL}/:accountId`} element={<AccountDetail />} />
      <Route path={`${ROUTES.USER_DETAIL}/:userId`} element={<UserDetail />} />
    </Routes>
  </div>
);

export default App;
