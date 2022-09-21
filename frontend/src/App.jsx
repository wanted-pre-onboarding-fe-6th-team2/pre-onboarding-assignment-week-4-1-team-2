import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import resetCss from '@/styles/reset';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';

const App = () => (
  <div>
    <Global styles={resetCss} />
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
    </Routes>
  </div>
);

export default App;
