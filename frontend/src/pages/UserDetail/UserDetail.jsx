import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>UserDetail</h1>
      <p>{userId}</p>
    </div>
  );
};

export default UserDetail;
