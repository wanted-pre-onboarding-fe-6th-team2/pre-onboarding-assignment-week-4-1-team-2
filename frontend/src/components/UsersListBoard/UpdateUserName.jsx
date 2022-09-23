import React, { useState } from 'react';
import { Td, Button, Input } from '@chakra-ui/react';
import userApiService from '@/api/userApiService';

const UpdateUserName = ({ cell, tdIndex }) => {
  // console.log(cell.row.original.id);
  const [userName, setUserName] = useState(cell.value);
  const [isEditMode, setIsEditMode] = useState(false);
  const createUserInputHandler = () => {
    setIsEditMode(current => !current);
  };
  const userNameChangeHandler = async () => {
    try {
      await userApiService.changeUserName({
        userId: cell.row.original.id,
        userName,
      });
      setIsEditMode(current => !current);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <Td textAlign="center" key={tdIndex}>
      {isEditMode ? (
        <>
          <Input onChange={e => setUserName(e.target.value)} type="text" value={userName} />
          <br />
          <Button onClick={userNameChangeHandler}>완료</Button>
        </>
      ) : (
        <>
          {userName}
          <br />
          <Button onClick={createUserInputHandler}>수정</Button>
        </>
      )}
    </Td>
  );
};

export default UpdateUserName;
