import { brokers } from '@/utils/brokers';

export const useBrokerName = brokerId => {
  const brokerName = brokers[brokerId];
  return brokerName;
};
