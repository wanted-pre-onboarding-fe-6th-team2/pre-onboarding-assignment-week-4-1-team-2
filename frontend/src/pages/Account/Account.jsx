import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import accountApiService from '@/api/accountApiService';
import AccountDetail from '@/components/AccountDetail/AccountDetail';

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
    <div>
      <h1>AccountDetail</h1>
      <AccountDetail account={accountInfo} />
    </div>
  );
};

export default Account;
