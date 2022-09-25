import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import accountApiService from '@/api/accountApiService';
import AccountDetail from '@/components/account/AccountDetail/AccountDetail';
import Layout from '@/components/common/Layout/Layout';

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
    <Layout>
      <Container maxW="90%">
        <AccountDetail account={accountInfo} />
      </Container>
    </Layout>
  );
};

export default Account;
