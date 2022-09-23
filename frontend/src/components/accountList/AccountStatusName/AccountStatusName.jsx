import React from 'react';
import { accountStatus } from '@/components/accountList/AccountStatusName/accountStatus';

const AccountStatusName = ({ status }) => {
  const getAccountStatusName = state => {
    return Object.keys(accountStatus).find(key => accountStatus[key] === state);
  };

  return <span>{getAccountStatusName(status)}</span>;
};
export default AccountStatusName;
