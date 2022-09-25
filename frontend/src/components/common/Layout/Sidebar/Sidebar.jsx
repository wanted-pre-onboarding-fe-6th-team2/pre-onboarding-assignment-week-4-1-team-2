import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import { CalendarIcon, HamburgerIcon, StarIcon, UnlockIcon, SunIcon } from '@chakra-ui/icons';
import { MenuBox, SidebarContainer, Title } from './Sidebar.styled';
import { ROUTES } from '@/constants/routes';

const siders = [
  { id: 1, name: '대시보드', keyword: 'home', link: ROUTES.HOME, icon: <CalendarIcon /> },
  { id: 2, name: '계좌 목록', keyword: 'account', link: ROUTES.ACCOUNTS, icon: <HamburgerIcon /> },
  { id: 3, name: '사용자 목록', keyword: 'user', link: ROUTES.USERSLIST, icon: <StarIcon /> },
  { id: 9999, name: '로그아웃', keyword: 'logout', link: ROUTES.LOGOUT, icon: <UnlockIcon /> },
];

const Sidebar = ({ collapsed }) => {
  const { pathname } = useLocation();

  return (
    <SidebarContainer color="white" minW={`${220 - 130 * collapsed}`} bg="blue.300" area="nav">
      <Title w="100%">
        <SunIcon w={6} h={6} />
        {!collapsed && (
          <Heading ml="4" as="h3" size="lg">
            PREFACE
          </Heading>
        )}
      </Title>
      <VStack align="row" mt={5}>
        {siders.map(sider => (
          <Link key={sider.id} to={`${sider.link}`}>
            <MenuBox
              h="40px"
              _hover={{
                color: 'white',
              }}
              lighten={pathname.includes(sider.keyword) ? 1 : 0}
              collapsed={collapsed}
            >
              {sider.icon}
              {!collapsed && (
                <Text ml="4" fontSize="lg">
                  {sider.name}
                </Text>
              )}
            </MenuBox>
          </Link>
        ))}
      </VStack>
    </SidebarContainer>
  );
};

export default Sidebar;
