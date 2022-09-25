import { accountStatus } from '@/utils/accountStatus';

export const useAccountStatus = status => {
  return Object.keys(accountStatus).find(key => accountStatus[key] === status);
};
