import React from 'react';
import { Container } from '@chakra-ui/react';
import AccountListBoard from '@/components/accountList/AccountListBoard/AccountListBoard';
import Layout from '@/components/common/Layout/Layout';

const AccountList = () => {
  return (
    <Layout>
      <Container maxW="full">
        <AccountListBoard />
      </Container>
    </Layout>
  );
};
export default AccountList;
