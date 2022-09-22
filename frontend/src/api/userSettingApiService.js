import http from '@/api/core';

const userSettingApiService = {
  getUsersSetting: () => http.get({ url: '/userSetting' }),

  getUserSetting: async ({ userUuid }) => {
    const [userSetting] = await http.get({ url: `/userSetting?q=${userUuid}` });

    if (!userSetting) throw new Error('찾으려는 userSetting의 고유 식별자가 존재하지 않습니다.');

    return userSetting;
  },
};

export default userSettingApiService;
