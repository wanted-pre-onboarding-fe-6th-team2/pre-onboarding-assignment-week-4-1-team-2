import { v4 as uuidv4 } from 'uuid';
import http from '@/api/core';

const userApiService = {
  getUsersCount: async () => {
    const usersResponse = await http.get({ url: `/users` });

    const filteredUsers = usersResponse.filter(({ uuid }) => uuid);

    return filteredUsers.length;
  },

  getUsers: async (
    { page, limit, keyword, order, sort, queryString } = {
      page: 1,
      limit: 20,
      keyword: '',
      sort: '',
      order: 'asc',
      queryString: '',
    }
  ) =>
    http.get({
      url: `/users?_page=${page}&_limit=${limit}${
        keyword ? `&q=${keyword}` : ''
      }&_sort=${sort}&_order=${order}&${queryString}`,
    }),

  getUser: ({ userId }) => http.get({ url: `/users/${userId}` }),

  async createUser({
    profilePhotoUrl,
    name,
    email,
    password,
    age,
    genderOrigin,
    birthDate,
    phoneNumber,
    address,
    detailAddress,
  }) {
    const currentDateISOString = new Date().toISOString();
    const uuid = uuidv4();
    const createUserResponse = await http.post({
      url: '/users',
      data: {
        uuid,
        photo: profilePhotoUrl,
        name,
        email,
        password,
        age,
        gender_origin: genderOrigin,
        birth_date: birthDate,
        phone_number: phoneNumber,
        address,
        detail_address: detailAddress,
        last_login: currentDateISOString,
        created_at: currentDateISOString,
        updated_at: currentDateISOString,
      },
    });

    const createUserSettingResponse = await http.post({
      url: '/userSetting',
      data: {
        uuid,
        allow_marketing_push: false,
        allow_invest_push: false,
        is_active: true,
        is_staff: false,
        created_at: currentDateISOString,
        updated_at: currentDateISOString,
      },
    });

    return { ...createUserResponse, ...createUserSettingResponse };
  },

  deleteUser: async ({ userUuid }) => {
    const [deleteTargetUser] = await http.get({ url: `users?q=${userUuid}` });
    const [deleteTargetUserSetting] = await http.get({ url: `userSetting?q=${userUuid}` });

    if (!deleteTargetUser || !deleteTargetUserSetting)
      throw new Error('삭제하려는 유저의 식별자를 찾지 못했습니다.');

    http.delete({ url: `users/${deleteTargetUser.id}` });
    http.delete({ url: `userSetting/${deleteTargetUserSetting.id}` });
  },

  changeUserName: ({ userId, userName }) =>
    http.patch({ url: `users/${userId}`, data: { name: userName } }),
};

export default userApiService;
