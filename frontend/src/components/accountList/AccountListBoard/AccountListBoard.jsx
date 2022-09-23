import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Input, Flex, Container } from '@chakra-ui/react';
import accountApiService from '@/api/accountApiService';
import AccountUserName from '@/components/accountList/AccountUserName/AccountUserName';
import BrokerName from '@/components/accountList/BrokerName/BrokerName';
import AccountStatusName from '@/components/accountList/AccountStatusName/AccountStatusName';
import AccountNumber from '@/components/accountList/AccountNumber/AccountNumber';

const AccountListBoard = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState({
    page: new URLSearchParams(search).get('_page') || 1,
    limit: new URLSearchParams(search).get('_limit') || 20,
    keyword: new URLSearchParams(search).get('q') || '',
    sort: '',
    order: 'asc',
  });
  const { page, limit, sort, order } = currentPage;
  const [word, setWord] = useState('');

  const [accountList, setAccountList] = useState([]);
  const [error, setError] = useState(false);

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

  const handleSearch = () => {
    setCurrentPage(prev => ({ ...prev, keyword: word }));
    navigate(`?_page=${page}&_limit=${limit}&q=${word}`);
  };
  const handleChangeKeyword = e => {
    const { value } = e.target;
    setWord(value);
  };

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
      <Container maxW="md">
        <Flex>
          <Input name="search" value={word} onChange={handleChangeKeyword} />
          <Button type="Button" onClick={handleSearch}>
            검색
          </Button>
        </Flex>
      </Container>
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
                <Link to={`${account.user_id}`}>
                  <AccountUserName userId={account.user_id} />
                </Link>
              </Td>
              <Td>
                <BrokerName brokerId={account.broker_id} />
              </Td>
              <Td>
                <Link to={`${account.number}`}>
                  <AccountNumber accountNumber={account.number} brokerId={account.broker_id} />
                </Link>
              </Td>
              <Td>
                <AccountStatusName status={account.status} />
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
