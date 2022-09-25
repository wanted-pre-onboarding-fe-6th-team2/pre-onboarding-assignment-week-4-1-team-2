import { GridItem, Button, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

const HeaderContainer = styled(GridItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FoldButton = styled(Button)`
  background-color: white;
`;

const LeftBox = styled(Box)`
  display: flex;
  align-items: center;
`;

const RightBox = styled(Box)`
  margin-right: 7px;
  display: flex;
  align-items: center;
`;

export { HeaderContainer, FoldButton, LeftBox, RightBox };
