import { useEffect, useState } from 'react';
import userApiService from '@/api/userApiService';

export const useAccountUser = userId => {
  const [user, setUser] = useState('');
  const { name } = user;
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
  }, [userId]);

  return name;
};
