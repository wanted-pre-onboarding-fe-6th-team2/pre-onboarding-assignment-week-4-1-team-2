import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const AccountNameLink = ({ name, id }) => {
  return <Link to={`${ROUTES.ACCOUNT}/${id}`}>{name}</Link>;
};

export default AccountNameLink;
