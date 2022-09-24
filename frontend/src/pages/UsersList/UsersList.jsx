import React, { useEffect, useState, useMemo } from 'react';
import { Container, Flex } from '@chakra-ui/react';
import UsersListBoard from '@/components/UsersListBoard/UsersListBoard';
import userApiService from '@/api/userApiService';
import Search from '@/components/Search/Search';
import UserForm from '@/components/UsersListBoard/UserForm';

const Users = () => {
  const [currentPage, setCurrentPage] = useState();

  const [pageError, setPageError] = useState(false);
  const [usersData, setUsersData] = useState([]);

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

  // 현재 페이지의 유저 리스트를 가져옵니다.
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
      <Container maxW="100%">
        <Flex justifyContent="space-between" alignItems="center" m="30px 0 10px 0">
          <Flex gap={3}>
            <Search currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </Flex>
          <UserForm />
        </Flex>
      </Container>

      <UsersListBoard columns={columns} usersData={usersData} />
    </>
  );
};

export default Users;
