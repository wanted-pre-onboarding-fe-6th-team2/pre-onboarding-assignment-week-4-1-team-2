import http from '@/api/core';

const userApiService = {
  login: ({ email, password } = {}) => http.post({ url: '/login', data: { email, password } }),
};

export default userApiService;
