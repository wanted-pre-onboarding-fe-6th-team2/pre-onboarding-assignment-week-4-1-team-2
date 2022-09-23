import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { useAccountUser } from '@/hooks/useAccountUser';

const UserName = ({ userId }) => {
  const userName = useAccountUser(userId);

  return <Link to={`${ROUTES.USER}/${userId}`}>{userName}</Link>;
};

export default UserName;
