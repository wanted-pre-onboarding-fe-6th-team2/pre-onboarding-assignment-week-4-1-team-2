import React, { useEffect, useState, useMemo } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import UsersListBoard from '@/components/UsersListBoard/UsersListBoard';
import userApiService from '@/api/userApiService';
import Search from '@/components/Search/Search';
import UserForm from '@/components/UsersListBoard/UserForm';
import Pagination from '@/components/common/Pagination/Pagination';
import useFetchData from '@/hooks/useFetchData';
import Layout from '@/components/common/Layout/Layout';

const Users = () => {
  const [totalPages, setTotalPages] = useState(0);
  const { data, parms } = useFetchData(userApiService.getUsers);
  const usersData = data;

  const [currentPage, setCurrentPage] = useState({
    ...parms,
  });
  const { keyword, limit } = currentPage;

  const [pageError, setPageError] = useState(false);

  const getTotal = async () => {
    const getUsersTotalCount = await userApiService.getUsersTotalCount({ keyword });
    const userTotal = Math.ceil(getUsersTotalCount / limit);
    setTotalPages(userTotal);
  };
  useEffect(() => {
    getTotal();
  }, [currentPage]);

  // 유저 리스트 테이블의 헤더를 결정합니다.
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
      {
        accessor: 'delete_btn',
        Header: '삭제',
        disableSortBy: true,
      },
    ],
    []
  );

  if (!data) return setPageError(true);
  if (pageError) return <div>Error... </div>;

  return (
    <Layout>
      <Container maxW="100%">
        <Flex justifyContent="space-between" alignItems="center" m="30px 0 10px 0">
          <Flex gap={3}>
            <Search currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </Flex>
          <UserForm />
        </Flex>
      </Container>

      <UsersListBoard columns={columns} usersData={usersData} />
      <Flex m="30px 0 10px 0" justifyContent="center">
        <Pagination totalPages={totalPages} parms={currentPage} setCurrentPage={setCurrentPage} />
      </Flex>
    </Layout>
  );
};

export default Users;
