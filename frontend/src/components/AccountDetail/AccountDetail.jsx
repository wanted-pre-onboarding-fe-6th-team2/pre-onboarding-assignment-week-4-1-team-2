import React from 'react';

const AccountDetail = ({ account }) => {
  return (
    <div>
      <p>{account.broker_id}</p>
      <p>{account.created_at}</p>
      <p>{account.is_active}</p>
      <p>{account.name}</p>
      <p>{account.number}</p>
      <p>{account.payments}</p>
      <p>{account.status}</p>
      <p>{account.updated_at}</p>
      <p>{account.user_id}</p>
      <p>{account.assets}</p>
    </div>
  );
};

export default AccountDetail;
