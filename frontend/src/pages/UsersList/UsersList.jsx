import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UsersListBoard from '@/components/UsersListBoard/UsersListBoard';
import userApiService from '@/api/userApiService';
import UserForm from '@/components/UsersListBoard/UserForm';

const Users = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState({
    page: new URLSearchParams(search).get('_page') || 1,
    limit: new URLSearchParams(search).get('_limit') || 20,
    keyword: new URLSearchParams(search).get('q') || '',
    sort: '',
    order: 'asc' || 'desc',
  });

  const [pageError, setPageError] = useState(false);
  const { page, limit } = currentPage;
  const [word, setWord] = useState('');
  const [usersData, setUsersData] = useState([]);
  const handleSearch = () => {
    setCurrentPage(prev => ({ ...prev, keyword: word }));
    navigate(`?_page=${page}&_limit=${limit}&q=${word}`);
  };
  const handleChangeKeyword = e => {
    const { value } = e.target;
    setWord(value);
  };
  const columns = useMemo(
    () => [
      {
        accessor: 'name',
        Header: '고객명',
        disableSortBy: true,
      },
      {
        accessor: 'accout_count',
        Header: '보유 계좌수',
        disableSortBy: true,
      },
      {
        accessor: 'email',
        Header: '이메일',
        disableSortBy: true,
      },
      {
        accessor: 'gender_origin',
        Header: '성별코드',
        disableSortBy: true,
      },
      {
        accessor: 'birth_date',
        Header: '생년월일',
        disableSortBy: true,
      },
      {
        accessor: 'phone_number',
        Header: '휴대폰 번호',
        disableSortBy: true,
      },
      {
        accessor: 'last_login',
        Header: '최근 로그인',
        disableSortBy: true,
      },
      {
        accessor: 'allow_marketing_push',
        Header: '혜택 수신 동의 여부',
        disableSortBy: true,
      },
      {
        accessor: 'is_active',
        Header: '활성화 여부',
        disableSortBy: false,
      },
      {
        accessor: 'created_at',
        Header: '가입일',
        disableSortBy: true,
      },
    ],
    []
  );

  useEffect(() => {
    try {
      const getUsersData = async () => {
        const usersDataresult = await userApiService.getUsers(currentPage);
        setUsersData(usersDataresult);
      };
      getUsersData();
    } catch (error) {
      setPageError(true);
      throw new Error(error);
    }
  }, [currentPage, setCurrentPage]);

  if (pageError) return <div>Error... </div>;

  return (
    <>
      <div>
        <input name="search" value={word} onChange={handleChangeKeyword} />
        <button type="button" onClick={handleSearch}>
          검색
        </button>
      </div>
      <UsersListBoard columns={columns} usersData={usersData} />
      <UserForm />
    </>
  );
};

export default Users;
