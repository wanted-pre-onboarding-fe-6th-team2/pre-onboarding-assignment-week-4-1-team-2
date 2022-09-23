import { Button } from '@chakra-ui/react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const PageButton = styled(Button)`
  opacity: 0.7;
  ${({ disabled }) => {
    return (
      disabled &&
      css`
        :disabled {
          background-color: var(--chakra-colors-gray-300);
          opacity: 1;
          pointer-events: none;
        }
      `
    );
  }}
`;

export { PageButton };
