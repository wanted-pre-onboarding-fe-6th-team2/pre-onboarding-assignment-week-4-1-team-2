import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import accountApiService from '@/api/accountApiService';
import AccountUserName from '@/components/accountList/AccountUserName/AccountUserName';
import { ROUTES } from '@/constants/routes';
import BrokerName from '@/components/common/BrokerName/BrokerName';
import AccountNumber from '@/components/common/AccountNumber/AccountNumber';
import AccountStatus from '@/components/common/AccountStatus/AccountStatus';
import Search from '@/components/Search/Search';

const AccountListBoard = () => {
  const [currentPage, setCurrentPage] = useState({
    sort: '',
    order: 'asc',
  });
  const [accountList, setAccountList] = useState([]);
  const [error, setError] = useState(false);

  const { sort, order } = currentPage;

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountResponse = await accountApiService.getAccounts(currentPage);
        setAccountList(accountResponse);
      } catch (e) {
        setError(true);
        throw new Error(e);
      }
    };

    fetchAccounts();
  }, [currentPage, setCurrentPage]);

  const handleFilter = e => {
    const { name } = e.target;
    if (sort === name) {
      setCurrentPage(prev => ({ ...prev, order: order === 'asc' ? 'desc' : 'asc' }));
    } else {
      setCurrentPage(prev => ({ ...prev, sort: name, order: 'asc' }));
    }
  };

  if (error) return <div>Error... </div>;

  return (
    <>
      <Search currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Table style={{ textAlign: 'center' }}>
        <Thead>
          <Tr>
            <Th>고객명</Th>
            <Th>
              <Button type="Button" onClick={handleFilter} name="broker_id">
                브로커명
              </Button>
            </Th>
            <Th>계좌번호</Th>
            <Th onClick={handleFilter}>
              <Button type="Button" onClick={handleFilter} name="status">
                계좌상태
              </Button>
            </Th>
            <Th>계좌명</Th>
            <Th>평가금액</Th>
            <Th>입금금액</Th>
            <Th onClick={handleFilter}>
              <Button type="Button" onClick={handleFilter} name="is_active">
                계좌활성화여부
              </Button>
            </Th>
            <Th>계좌개설일</Th>
          </Tr>
        </Thead>
        <Tbody>
          {accountList.map(account => (
            <Tr key={account.uuid}>
              <Td>
                <Link to={`${ROUTES.USER}/${account.user_id}`}>
                  <AccountUserName userId={account.user_id} />
                </Link>
              </Td>
              <Td>
                <BrokerName brokerId={account.broker_id} />
              </Td>
              <Td>
                <Link to={`${ROUTES.ACCOUNT}/${account.user_id}`}>
                  <AccountNumber accountNumber={account.number} brokerId={account.broker_id} />
                </Link>
              </Td>
              <Td>
                <AccountStatus status={account.status} />
              </Td>
              <Td>{account.name}</Td>
              <Td
                style={
                  account.assets > account.payments
                    ? { color: 'red' }
                    : account.assets === account.payments
                    ? { color: 'black' }
                    : { color: 'blue' }
                }
              >
                {Number(account.assets).toLocaleString()}
              </Td>
              <Td>{Number(account.payments).toLocaleString()}</Td>
              <Td>{account.is_active ? 'Y' : 'N'}</Td>
              <Td>{new Date(account.created_at).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default AccountListBoard;
