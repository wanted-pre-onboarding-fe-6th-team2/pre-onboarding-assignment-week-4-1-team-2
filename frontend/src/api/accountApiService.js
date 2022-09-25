import http from '@/api/core';

const accountApiService = {
  getAccountsCount: async ({ keyword } = { keyword: '' }) => {
    const accountsResponse = await http.get({ url: `/accounts/?q=${keyword}` });

    return accountsResponse.length;
  },

  getAccounts: (
    { page, limit, keyword, sort, order, queryString } = {
      page: 1,
      limit: 20,
      keyword: '',
      sort: '',
      order: 'asc',
      queryString: '',
    }
  ) =>
    http.get({
      url: `/accounts?_page=${page}&_limit=${limit}${
        keyword ? `&q=${keyword}` : ''
      }&_sort=${sort}&_order=${order}&${queryString}`,
    }),

  getAccount: ({ accountId }) => http.get({ url: `/accounts/${accountId}` }),
};

export default accountApiService;
