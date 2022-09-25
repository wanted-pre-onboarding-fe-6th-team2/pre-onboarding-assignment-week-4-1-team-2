import React from 'react';
import { useBrokerName } from '@/hooks/useBrokerName';

const BrokerName = ({ brokerId }) => {
  const brokerName = useBrokerName(brokerId);

  return <span>{brokerName}</span>;
};

export default BrokerName;
