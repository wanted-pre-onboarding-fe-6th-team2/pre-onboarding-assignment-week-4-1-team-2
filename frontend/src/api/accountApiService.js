import http from '@/api/core';

const accountApiService = {
  getAccountsCount: async () => {
    const accountsResponse = await http.get({ url: `/accounts` });

    return accountsResponse.length;
  },

  getAccounts: ({ page, limit } = { page: 1, limit: 20 }) =>
    http.get({ url: `/accounts?_page=${page}&_limit=${limit}` }),

  getAccount: ({ accountId }) => http.get({ url: `/accounts/${accountId}` }),
};

export default accountApiService;
