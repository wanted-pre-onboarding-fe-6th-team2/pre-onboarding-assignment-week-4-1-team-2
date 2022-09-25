import React from 'react';
import { useBrokerFormat } from '@/hooks/useBrokerFormat';

const AccountNumber = ({ accountNumber, brokerId }) => {
  const accountFormat = useBrokerFormat(accountNumber, brokerId);

  return <span>{accountFormat}</span>;
};
export default AccountNumber;
