import React, { useEffect, useCallback, useState } from 'react';
import { useTable, useSortBy, disabledSort } from 'react-table';
import userSettingApiService from '@/api/userSettingApiService';
import userApiService from '@/api/userApiService';
import accountApiService from '@/api/accountApiService';

const UsersList = ({ columns, usersData }) => {
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
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    processingData();
  }, [processingData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data: newData,
      manualSortBy: false,
      disableSortBy: disabledSort,
    },
    useSortBy
  );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr key={index} {...row.getRowProps()}>
              {row.cells.map((cell, tdIndex) =>
                cell.value === 'true' ? (
                  <td key={tdIndex}>Y</td>
                ) : cell.value === 'false' ? (
                  <td key={tdIndex}> N </td>
                ) : (
                  <td key={tdIndex}>{cell.render('Cell')}</td>
                )
              )}
              <td>
                <button onClick={deleteUserHandler} type="button" value={row.original.uuid}>
                  삭제
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UsersList;
