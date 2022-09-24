import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import moment from 'moment';
import UserAccounts from '@/components/user/UserAccounts/UserAccounts';
import InnerHeading from '@/components/common/InnerHeading/InnerHeading';

const UserDetail = ({ user, userSetting }) => {
  return (
    <>
      <InnerHeading title="고객 정보" />
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
            <Td>{moment(new Date(user.birth_date)).format('LL')}</Td>
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
            <Td>{user.phone_number?.replace(/-[0-9]{4}-/g, '-****-')}</Td>
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
            <Td>{moment(new Date(user.created_at)).format('LL')}</Td>
          </Tr>
        </Tbody>
      </Table>
      <InnerHeading title="보유 계좌 목록" />
      <UserAccounts userId={user.id} />
    </>
  );
};

export default UserDetail;
