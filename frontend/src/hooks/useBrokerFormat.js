import { brokerFormat } from '@/utils/brokerFormat';

export const useBrokerFormat = (accountNumber, brokerId) => {
  const numberFormat = brokerFormat[brokerId].split('-');
  let length = 0;
  let newNumber = '';
  // const oldNumber = accountNumber.replace(/(?<=.{2})./gi, '*');
  // const regEx = new RegExp(`([d|*]{${length}})([0-9]+)([0-9]{5})`, 'gi');
  // const newNumber = accountNumber.replace(regEx, '$1-$2-$3');
  // // /([d|*]{`+${length}+`})([0-9]+)([0-9]{5})/

  for (let i = 0; i < numberFormat.length; i += 1) {
    newNumber += accountNumber.substring(length, numberFormat[i].length + length);
    length += numberFormat[i].length;
    if (i < numberFormat.length - 1) newNumber += '-';
  }
  return newNumber;
};
