import http from '@/api/core';

const accountApiService = {
  getAccountsCount: async () => {
    const accountsResponse = await http.get({ url: `/accounts` });

    return accountsResponse.length;
  },

  getAccounts: (
    { page, limit, keyword, sort, order } = {
      page: 1,
      limit: 20,
      keyword: '',
      sort: '',
      order: 'asc',
    }
  ) =>
    http.get({
      url: `/accounts?_page=${page}&_limit=${limit}&q=${keyword}&_sort=${sort}&_order=${order}`,
    }),

  getAccount: ({ accountId }) => http.get({ url: `/accounts/${accountId}` }),
};

export default accountApiService;
