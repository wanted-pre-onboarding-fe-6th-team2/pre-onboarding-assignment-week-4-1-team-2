import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import UserAccounts from '@/components/user/UserAccounts/UserAccounts';

const UserDetail = ({ user, userSetting }) => {
  console.log(user);
  return (
    <>
      <Table size="lg" variant="simple" fontSize="1.25em">
        <Thead>
          <Tr>
            <Th>고객명</Th>
            <Th>성별</Th>
            <Th>생년월일</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{user.name}</Td>
            <Td>{user.gender_origin}</Td>
            <Td>{new Date(user.birth_date).toLocaleString()}</Td>
          </Tr>
        </Tbody>
        <Thead>
          <Tr>
            <Th>주소</Th>
            <Th>이메일</Th>
            <Th>핸드폰</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{`${user.address} ${user.detail_address}`}</Td>
            <Td>{user.email}</Td>
            <Td>{user.phone_number}</Td>
          </Tr>
        </Tbody>
        <Thead>
          <Tr>
            <Th>투자 정보 수신 동의</Th>
            <Th>마케팅 정보 수신 동의</Th>
            <Th>가입 시각</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{userSetting.allow_invest_push ? '수신' : '미수신'}</Td>
            <Td>{userSetting.allow_marketing_push ? '수신' : '미수신'}</Td>
            <Td>{new Date(user.created_at).toLocaleString()}</Td>
          </Tr>
        </Tbody>
      </Table>
      <UserAccounts userId={user.id} />
    </>
  );
};

export default UserDetail;
