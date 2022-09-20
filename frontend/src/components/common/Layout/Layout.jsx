import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import Header from '@/components/common/Layout/Header/Header';
import Footer from '@/components/common/Layout/Footer/Footer';
import Sidebar from '@/components/common/Layout/Sidebar/Sidebar';

const Layout = ({ children }) => (
  <Grid
    templateAreas={`"nav header"
                  "nav main"
                  "nav footer"`}
    gridTemplateRows="50px 1fr 50px"
    gridTemplateColumns="150px 1fr"
    h="100vh"
    color="blackAlpha.700"
    fontWeight="bold"
  >
    <Header />
    <Sidebar />
    <GridItem pl="2" bg="green.300" area="main">
      {children}
    </GridItem>
    <Footer />
  </Grid>
);

export default Layout;
