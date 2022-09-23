import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import userApiService from '@/api/userApiService';
import { ROUTES } from '@/constants/routes';

const UserName = ({ userId }) => {
  const [userName, setUserName] = useState('');

  const getUserName = useCallback(async () => {
    const response = await userApiService.getUser({ userId });

    setUserName(response.name);
  }, [userId]);

  if (userId) getUserName();

  return <Link to={`${ROUTES.USER}/${userId}`}>{userName}</Link>;
};

export default UserName;
