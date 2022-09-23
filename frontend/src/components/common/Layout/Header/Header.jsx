import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { FoldButton, HeaderContainer, LeftBox, RightBox } from './Header.styled';

const Header = ({ collapsed, setCollapsed }) => {
  const { pathname } = useLocation();

  return (
    <HeaderContainer p="2" area="header">
      <LeftBox>
        <FoldButton type="button" onClick={() => setCollapsed(prev => !prev)}>
          {collapsed ? <ArrowRightIcon /> : <ArrowLeftIcon />}
        </FoldButton>
        <Text ml={3}>{pathname}</Text>
      </LeftBox>
      <RightBox>
        <Text>유저명</Text>
      </RightBox>
    </HeaderContainer>
  );
};

export default Header;
