import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import accountApiService from '@/api/accountApiService';
import AccountDetail from '@/components/account/AccountDetail/AccountDetail';

const Account = () => {
  const { accountId } = useParams();
  const [accountInfo, setAccountInfo] = useState({});

  const getAccountDetail = async id => {
    const response = await accountApiService.getAccount({ accountId: id });
    setAccountInfo(response);
  };

  useEffect(() => {
    getAccountDetail(accountId);
  }, [accountId]);

  return (
    <Container maxW="90%">
      <AccountDetail account={accountInfo} />
    </Container>
  );
};

export default Account;
