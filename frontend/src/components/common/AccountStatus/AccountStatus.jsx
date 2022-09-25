import React from 'react';
import { useAccountStatus } from '@/hooks/useAccountStatus';

const AccountStatus = ({ status }) => {
  const accountStatus = useAccountStatus(status);

  return <span>{accountStatus}</span>;
};
export default AccountStatus;
