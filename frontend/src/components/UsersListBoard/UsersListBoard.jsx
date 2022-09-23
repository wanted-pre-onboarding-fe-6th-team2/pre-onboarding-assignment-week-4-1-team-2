import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy, disabledSort, usePagination } from 'react-table';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import userSettingApiService from '@/api/userSettingApiService';
import userApiService from '@/api/userApiService';
import accountApiService from '@/api/accountApiService';
import UpdateUserName from '@/components/UsersListBoard/UpdateUserName';

const UsersList = ({ columns, usersData }) => {
  const navigate = useNavigate();
  const [newData, setNewData] = useState([]);
  const processingData = useCallback(async () => {
    const processingUsersData = usersData.map(async user => {
      const userSettingData = await userSettingApiService.getUserSetting({
        userUuid: user.uuid,
      });

      const accountCounting = await accountApiService.getAccountsCount();
      const getUserAccountsCounting = await accountApiService.getAccounts({
        page: 1,
        limit: accountCounting,
      });
      const totalCountAccounts = getUserAccountsCounting.filter(
        list => list.user_id === user.id
      ).length;

      return {
        ...user,
        birth_date: user.birth_date.slice(0, 10),
        created_at: user.created_at.slice(0, 10),
        last_login: user.last_login.slice(0, 10),
        phone_number: user.phone_number.replace(/-[0-9]{4}-/g, '-****-'),
        allow_marketing_push: userSettingData.allow_marketing_push.toString(),
        is_active: userSettingData.is_active.toString(),
        accout_count: totalCountAccounts,
      };
    });

    const result = await Promise.all(processingUsersData);
    setNewData(result);
  }, [usersData]);

  const deleteUserHandler = async e => {
    try {
      const { value } = e.target;
      if (value.length === 0) return;
      await userApiService.deleteUser({ userUuid: value });
      // eslint-disable-next-line no-alert
      alert('유저가 삭제되었습니다.');
      navigate(0);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    processingData();
  }, [processingData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    pageCount,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: newData,
      manualSortBy: false,
      disableSortBy: disabledSort,
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <Table variant="simple" colorScheme="blue" size="sm" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th textAlign="center" {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <Tr key={index} {...row.getRowProps()}>
                {row.cells.map((cell, tdIndex) =>
                  cell.column.Header === '고객명' ? (
                    <UpdateUserName key={tdIndex} cell={cell} />
                  ) : cell.column.Header === '삭제' ? (
                    <Td key={tdIndex}>
                      <Button onClick={deleteUserHandler} type="button" value={row.original.uuid}>
                        삭제
                      </Button>
                    </Td>
                  ) : cell.value === 'true' ? (
                    <Td textAlign="center" key={tdIndex}>
                      Y
                    </Td>
                  ) : cell.value === 'false' ? (
                    <Td textAlign="center" key={tdIndex}>
                      N
                    </Td>
                  ) : (
                    <Td textAlign="center" key={tdIndex}>
                      {cell.render('Cell')}
                    </Td>
                  )
                )}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <div>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </>
  );
};

export default UsersList;
