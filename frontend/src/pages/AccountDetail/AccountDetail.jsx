import React from 'react';
import { useParams } from 'react-router-dom';

const AccountDetail = () => {
  const { accountId } = useParams();
  return (
    <div>
      <h1>AccountDetail</h1>
      <p>{accountId}</p>
    </div>
  );
};

export default AccountDetail;
