import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import UserName from '@/components/account/UserName/UserName';

const AccountDetail = ({ account }) => {
  return (
    <Table size="lg" variant="simple" fontSize="1.25em">
      <Thead>
        <Tr>
          <Th>계좌명</Th>
          <Th>계좌번호</Th>
          <Th>고객명</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{account.name}</Td>
          <Td>{account.number}</Td>
          <Td>
            <UserName userId={account.user_id} />
          </Td>
        </Tr>
      </Tbody>
      <Thead>
        <Tr>
          <Th>계좌상태</Th>
          <Th>브로커명</Th>
          <Th>계좌개설일</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>{account.status}</Td>
          <Td>{account.broker_id}</Td>
          <Td>{new Date(account.created_at).toLocaleString()}</Td>
        </Tr>
      </Tbody>
      <Thead>
        <Tr>
          <Th>평가금액</Th>
          <Th>입금금액</Th>
          <Th>계좌활성화여부</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td
            color={
              account.assets > account.payments
                ? 'red'
                : account.assets === account.payments
                ? 'black'
                : 'blue'
            }
          >
            {Math.round(+account.assets).toLocaleString()}
          </Td>
          <Td>{Math.round(+account.payments).toLocaleString()}</Td>
          <Td color={account.is_active ? 'blue' : 'red'}>
            {account.is_active ? '활성화' : '비활성화'}
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default AccountDetail;
