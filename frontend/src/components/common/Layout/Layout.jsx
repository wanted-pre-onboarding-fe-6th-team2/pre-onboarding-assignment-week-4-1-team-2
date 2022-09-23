import React, { useState } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '@/components/common/Layout/Header/Header';
import Footer from '@/components/common/Layout/Footer/Footer';
import Sidebar from '@/components/common/Layout/Sidebar/Sidebar';

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Grid
      templateAreas={`"nav header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows="60px 1fr 50px"
      gridTemplateColumns={`${0.4 - 0.3 * collapsed}fr 3fr`}
      h="100vh"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <Header collapsed={collapsed ? 1 : 0} setCollapsed={setCollapsed} />
      <Sidebar collapsed={collapsed ? 1 : 0} />
      <GridItem p="2" bg="gray.100" area="main">
        {children}
      </GridItem>
      <Footer />
    </Grid>
  );
};

export default Layout;
