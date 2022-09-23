import React from 'react';
import { Container } from '@chakra-ui/react';
import AccountListBoard from '@/components/accountList/AccountListBoard/AccountListBoard';

const AccountList = () => {
  return (
    <Container maxW="full">
      <AccountListBoard />
    </Container>
  );
};
export default AccountList;
