import React, { useState } from 'react';
import { Td, Button, Input, Flex } from '@chakra-ui/react';
import userApiService from '@/api/userApiService';

const UpdateUserName = ({ cell, tdIndex }) => {
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
  const regexName = /\b(\w{1,2})(\w{2,}?)(\w?)\b/g;
  const maskingName = userName.replace(
    regexName,
    (_, first, middle, last) => `${first}${'*'.repeat(middle.length)}${last}`
  );

  return (
    <Td textAlign="center" key={tdIndex}>
      {isEditMode ? (
        <Flex gap={2} justifyContent="center" alignItems="center">
          <Input onChange={e => setUserName(e.target.value)} type="text" value={userName} />
          <br />
          <Button colorScheme="yellow" size="xs" onClick={userNameChangeHandler}>
            완료
          </Button>
        </Flex>
      ) : (
        <Flex gap={2} justifyContent="center" alignItems="center">
          {maskingName}
          <br />
          <Button size="xs" onClick={createUserInputHandler}>
            수정
          </Button>
        </Flex>
      )}
    </Td>
  );
};

export default UpdateUserName;
