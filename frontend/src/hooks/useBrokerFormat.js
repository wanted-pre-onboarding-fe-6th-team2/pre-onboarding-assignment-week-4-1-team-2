import { brokerFormat } from '@/utils/brokerFormat';

export const useBrokerFormat = (accountNumber, brokerId) => {
  const numberFormat = brokerFormat[brokerId]?.split('-');
  let length = 0;
  let newNumber = '';
  const number = `${accountNumber}`;
  const oldNumber = `${number.substring(0, 2)}********${number.substring(10, 12)}`;
  for (let i = 0; i < numberFormat?.length; i += 1) {
    newNumber += oldNumber.substring(length, numberFormat[i].length + length);
    length += numberFormat[i].length;
    if (i < numberFormat.length - 1) newNumber += '-';
  }
  return newNumber;
};
