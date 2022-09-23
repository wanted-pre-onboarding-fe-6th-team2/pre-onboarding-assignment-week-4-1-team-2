import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import userApiService from '@/api/userApiService';
import userSettingApiService from '@/api/userSettingApiService';
import LoginExtensionBtn from '@/components/common/LoginExtensionBtn';
import UserDetailTable from '@/components/user/UserDetail/UserDetail';

const User = () => {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userSetting, setUserSetting] = useState({});

  const getUserDetail = async id => {
    const response = await userApiService.getUser({ userId: id });
    setUserInfo(response);
  };

  const getUserSetting = async id => {
    const response = await userSettingApiService.getUserSetting({ userUuid: id });
    setUserSetting(response);
  };

  useEffect(() => {
    getUserDetail(userId);
    getUserSetting(userId);
  }, [userId]);

  return (
    <Container maxW="90%">
      <LoginExtensionBtn />
      <UserDetailTable user={userInfo} userSetting={userSetting} />
    </Container>
  );
};

export default User;
