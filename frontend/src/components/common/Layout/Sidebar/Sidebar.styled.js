import { Box, GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';

const SidebarContainer = styled(GridItem)`
  overflow: hidden;
`;

const Title = styled(Box)`
  display: fixed;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const MenuBox = styled(Box)`
  display: fixed;
  justify-content: ${({ collapsed }) => collapsed && 'center'};
  padding-left: ${({ collapsed }) => !collapsed && '30px'};
  background-color: ${({ lighten }) => lighten && 'var(--chakra-colors-blue-500)'};
  color: ${({ lighten }) => (lighten ? 'white' : 'var(--chakra-colors-gray-200)')};
  align-items: center;
  cursor: pointer;
`;

export { SidebarContainer, Title, MenuBox };
