import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import resetCss from '@/styles/reset';
import Home from '@/pages/Home/Home';
import AccountList from '@/pages/AccountList/AccountList';

const App = () => (
  <div>
    <Global styles={resetCss} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<AccountList />} />
    </Routes>
  </div>
);

export default App;
