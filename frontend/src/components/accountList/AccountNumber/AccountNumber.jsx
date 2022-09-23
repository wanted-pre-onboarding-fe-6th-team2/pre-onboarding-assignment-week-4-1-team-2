import React from 'react';
// import { brokerFormat } from '@/components/accountList/AccountNumber/brokerFormat';

const AccountNumber = ({ accountNumber }) => {
  const accountNumberFormat = number => {
    // const format = brokerFormat[brokerId];
    return number.replace(/(?<=.{2})./gi, '*');
  };
  return <div>{accountNumberFormat(accountNumber)}</div>;
};
export default AccountNumber;
