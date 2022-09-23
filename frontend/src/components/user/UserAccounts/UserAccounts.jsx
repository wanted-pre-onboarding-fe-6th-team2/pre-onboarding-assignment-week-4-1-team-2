import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import accountApiService from '@/api/accountApiService';

const UserAccounts = ({ userId }) => {
  const [userAccounts, setUserAccounts] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const getUserAccounts = async () => {
      try {
        const response = await accountApiService.getAccounts({
          page: 1,
          limit: 20,
          keyword: '',
          sort: '',
          order: 'asc',
          queryString: `user_id=${userId}`,
        });

        setUserAccounts(response);
      } catch (err) {
        setError(err);
        throw new Error(err);
      }
    };

    getUserAccounts();
  }, [userId]);

  return (
    <div>
      {error && <h1>계좌 정보를 불러올 수 없습니다.</h1>}
      <Table>
        <Thead>
          <Tr>
            <Th>번호</Th>
            <Th>브로커명</Th>
            <Th>계좌개설일</Th>
            <Th>계좌활성화여부</Th>
            <Th>계좌명</Th>
            <Th>계좌번호</Th>
            <Th>평가금액</Th>
            <Th>계좌상태</Th>
          </Tr>
        </Thead>
        {userAccounts.map((account, index) => (
          <Tbody key={account.uuid}>
            <Tr>
              <Td>{index + 1}</Td>
              <Td>{account.broker_id}</Td>
              <Td>{account.created_at}</Td>
              <Td>{account.is_active}</Td>
              <Td>{account.name}</Td>
              <Td>{account.number}</Td>
              <Td>{account.assets}</Td>
              <Td>{account.payments}</Td>
              <Td>{account.status}</Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </div>
  );
};

export default UserAccounts;
