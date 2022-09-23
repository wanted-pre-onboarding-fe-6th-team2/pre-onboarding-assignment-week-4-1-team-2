import React from 'react';
import { brokers } from '@/components/accountList/BrokerName/brokers';

const BrokerName = ({ brokerId }) => {
  return <span>{brokers[brokerId]}</span>;
};
export default BrokerName;
