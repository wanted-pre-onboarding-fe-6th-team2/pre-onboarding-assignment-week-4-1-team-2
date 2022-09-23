import React, { useEffect, useCallback, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Avatar, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { FoldButton, HeaderContainer, LeftBox, RightBox } from './Header.styled';
import userApiService from '@/api/userApiService';

const Header = ({ pageName, collapsed, setCollapsed }) => {
  const { id } = useSelector(state => state.auth).currentUser.user;
  const [userName, setUserName] = useState();

  const getUserName = useCallback(async () => {
    const userResponse = await userApiService.getUser({ userId: id });
    if (!userResponse.name) {
      setUserName('관리자');
      return;
    }
    setUserName(userResponse.name);
  }, [id]);

  useEffect(() => {
    getUserName();
  }, [getUserName]);

  return (
    <HeaderContainer p="2" area="header">
      <LeftBox>
        <FoldButton type="button" onClick={() => setCollapsed(prev => !prev)}>
          {collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </FoldButton>
        <Text ml={3}>{pageName}</Text>
      </LeftBox>
      <RightBox>
        <Avatar mr={3} size="sm" bg="teal.500" />
        <Text w={30}>{userName}</Text>
      </RightBox>
    </HeaderContainer>
  );
};

export default React.memo(Header);
