import React, { useEffect, useState } from 'react';
import userApiService from '@/api/userApiService';

const AccountUserName = ({ userId }) => {
  const [user, setUser] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await userApiService.getUser({ userId });
        setUser(userResponse);
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchUser();
  }, []);
  return <span>{user.name}</span>;
};
export default AccountUserName;
