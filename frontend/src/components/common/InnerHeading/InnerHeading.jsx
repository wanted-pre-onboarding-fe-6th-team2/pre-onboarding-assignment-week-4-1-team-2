import React from 'react';
import { Text } from '@chakra-ui/react';

const InnerHeading = ({ title }) => {
  return (
    <Text fontSize="1.5em" m="1em" p="0.5em" borderBottom="0.1em solid gray">
      {title}
    </Text>
  );
};

export default InnerHeading;
