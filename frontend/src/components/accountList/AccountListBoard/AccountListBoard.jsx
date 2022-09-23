import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
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
    order: 'asc' || 'desc',
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
      <div>
        <input name="search" value={word} onChange={handleChangeKeyword} />
        <button type="button" onClick={handleSearch}>
          검색
        </button>
      </div>
      <table style={{ textAlign: 'center' }}>
        <thead>
          <tr>
            <th>고객명</th>
            <th>
              <button type="button" onClick={handleFilter} name="broker_id">
                브로커명
              </button>
            </th>
            <th>계좌번호</th>
            <th onClick={handleFilter}>
              <button type="button" onClick={handleFilter} name="status">
                계좌상태
              </button>
            </th>
            <th>계좌명</th>
            <th>평가금액</th>
            <th>입금금액</th>
            <th onClick={handleFilter}>
              <button type="button" onClick={handleFilter} name="is_active">
                계좌활성화여부
              </button>
            </th>
            <th>계좌개설일</th>
          </tr>
        </thead>
        <tbody>
          {accountList.map(account => (
            <tr key={account.uuid}>
              <td>
                <Link to={`${account.user_id}`}>
                  <AccountUserName userId={account.user_id} />
                </Link>
              </td>
              <td>
                <BrokerName brokerId={account.broker_id} />
              </td>
              <td>
                <Link to={`${account.number}`}>
                  <AccountNumber accountNumber={account.number} />
                </Link>
              </td>
              <td>
                <AccountStatusName status={account.status} />
              </td>
              <td>{account.name}</td>
              <td
                style={
                  account.assets > account.payments
                    ? { color: 'red' }
                    : account.assets === account.payments
                    ? { color: 'black' }
                    : { color: 'blue' }
                }
              >
                {Number(account.assets).toLocaleString()}
              </td>
              <td>{Number(account.payments).toLocaleString()}</td>
              <td>{account.is_active ? 'Y' : 'N'}</td>
              <td>{new Date(account.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default AccountListBoard;
