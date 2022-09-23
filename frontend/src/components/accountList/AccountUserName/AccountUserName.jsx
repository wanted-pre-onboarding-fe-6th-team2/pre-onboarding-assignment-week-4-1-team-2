import React from 'react';
import { useAccountUser } from '@/hooks/useAccountUser';

const AccountUserName = ({ userId }) => {
  const userName = useAccountUser(userId);
  return <span>{userName}</span>;
};
export default AccountUserName;
