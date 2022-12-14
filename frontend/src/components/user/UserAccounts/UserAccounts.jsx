import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import moment from 'moment';
import accountApiService from '@/api/accountApiService';
import AccountNameLink from '@/components/user/AccountNameLink/AccountNameLink';
import BrokerName from '@/components/common/BrokerName/BrokerName';
import AccountStatus from '@/components/common/AccountStatus/AccountStatus';
import AccountNumber from '@/components/common/AccountNumber/AccountNumber';

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
    <>
      {error && <h2>계좌 정보를 불러올 수 없습니다.</h2>}
      <Table size="sm" variant="simple">
        <Thead>
          <Tr>
            <Th>번호</Th>
            <Th>계좌명</Th>
            <Th>계좌번호</Th>
            <Th>계좌개설일</Th>
            <Th>브로커명</Th>
            <Th>계좌활성화여부</Th>
            <Th>평가금액</Th>
            <Th>입금금액</Th>
            <Th>계좌상태</Th>
          </Tr>
        </Thead>
        {userAccounts.map((account, index) => (
          <Tbody key={account.uuid}>
            <Tr>
              <Td>{index + 1}</Td>
              <Td>
                <AccountNameLink name={account.name} id={account.id} />
              </Td>
              <Td>
                <AccountNumber accountNumber={account.number} brokerId={account.broker_id} />
              </Td>
              <Td>{moment(new Date(account.created_at)).format('LL')}</Td>
              <Td>
                <BrokerName brokerId={account.broker_id} />
              </Td>
              <Td color={account.is_active ? 'blue' : 'red'}>
                {account.is_active ? '활성화' : '비활성화'}
              </Td>
              <Td
                color={
                  account.assets > account.payments
                    ? 'red'
                    : account.assets === account.payments
                    ? 'black'
                    : 'blue'
                }
              >
                {Math.round(account.assets).toLocaleString()}
              </Td>
              <Td>{Math.round(account.payments).toLocaleString()}</Td>
              <Td>
                <AccountStatus status={account.status} />
              </Td>
            </Tr>
          </Tbody>
        ))}
      </Table>
    </>
  );
};

export default UserAccounts;
