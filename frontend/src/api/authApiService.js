import http from '@/api/core';

const authApiService = {
  login: ({ email, password } = {}) => http.post({ url: '/login', data: { email, password } }),
};

export default authApiService;
