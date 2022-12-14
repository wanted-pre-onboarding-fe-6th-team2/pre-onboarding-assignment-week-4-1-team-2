import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Container, Flex } from '@chakra-ui/react';
import accountApiService from '@/api/accountApiService';
import AccountUserName from '@/components/accountList/AccountUserName/AccountUserName';
import { ROUTES } from '@/constants/routes';
import BrokerName from '@/components/common/BrokerName/BrokerName';
import AccountNumber from '@/components/common/AccountNumber/AccountNumber';
import AccountStatus from '@/components/common/AccountStatus/AccountStatus';
import Search from '@/components/Search/Search';
import Pagination from '@/components/common/Pagination/Pagination';
import useFetchData from '@/hooks/useFetchData';

const AccountListBoard = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const [totalPages, setTotalPages] = useState(0);
  const { data, parms } = useFetchData(accountApiService.getAccounts);
  const [pageError, setPageError] = useState(false);
  const accountsList = data;
  const [currentPage, setCurrentPage] = useState({
    ...parms,
  });
  const { sort, keyword, limit } = currentPage;

  const getTotal = async () => {
    const getAccountsCount = await accountApiService.getAccountsCount({ keyword });
    const acountTotal = Math.ceil(getAccountsCount / limit);
    setTotalPages(acountTotal);
  };
  useEffect(() => {
    getTotal();
  }, [currentPage]);

  const handleFilter = e => {
    const { name } = e.target;
    const orderBy = searchParams.get('_order');
    if (sort === name) {
      if (orderBy === 'asc') {
        navigate(`?_sort=${name}&_order=desc`);
        setCurrentPage(prev => ({ ...prev, order: 'desc' }));
      } else {
        navigate(`?_sort=${name}&_order=asc`);
        setCurrentPage(prev => ({ ...prev, order: 'asc' }));
      }
    } else {
      navigate(`?_sort=${name}&_order=asc`);
      setCurrentPage(prev => ({ ...prev, sort: name, order: 'asc' }));
    }
  };

  if (!data) return setPageError(true);
  if (pageError) return <div>Error... </div>;

  return (
    <>
      <Container maxW="100%">
        <Flex m="30px 0 10px 0">
          <Flex gap={3}>
            <Search currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </Flex>
        </Flex>
      </Container>
      <Table alignItems="center">
        <Thead>
          <Tr>
            <Th>?????????</Th>
            <Th>
              <Button
                type="Button"
                onClick={handleFilter}
                name="broker_id"
                variant="ghost"
                fontSize="xs"
              >
                ????????????
              </Button>
            </Th>
            <Th>????????????</Th>
            <Th onClick={handleFilter}>
              <Button
                type="Button"
                onClick={handleFilter}
                name="status"
                variant="ghost"
                fontSize="xs"
              >
                ????????????
              </Button>
            </Th>
            <Th>?????????</Th>
            <Th>????????????</Th>
            <Th>????????????</Th>
            <Th onClick={handleFilter}>
              <Button
                type="Button"
                onClick={handleFilter}
                name="is_active"
                variant="ghost"
                fontSize="xs"
              >
                ?????????????????????
              </Button>
            </Th>
            <Th>???????????????</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.length > 0 ? (
            accountsList.map(account => (
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
            ))
          ) : (
            <Tr>
              <Td style={{ textAlign: 'center', padding: '50px' }} colSpan={9}>
                ?????? ????????? ????????????.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <Flex m="30px 0 10px 0" justifyContent="center">
        <Pagination totalPages={totalPages} parms={currentPage} setCurrentPage={setCurrentPage} />
      </Flex>
    </>
  );
};

export default AccountListBoard;
