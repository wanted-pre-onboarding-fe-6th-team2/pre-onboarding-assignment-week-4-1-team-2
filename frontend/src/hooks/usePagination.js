import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

const usePagination = (dataLength, apiCall, volume = 20) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const parms = {
    page: +searchParams.get('_page') || 1,
    limit: +searchParams.get('_limit') || 20,
    keyword: searchParams.get('_q') || '',
    sort: searchParams.get('_sort') || 'id',
    order: searchParams.get('_order') || 'asc',
  };

  const { page, limit, keyword, sort, order } = parms;

  const [data, setData] = useState([]);
  const totalPages = useMemo(() => Math.floor(dataLength / volume), [volume, dataLength]);

  const fetchData = useCallback(async () => {
    const newData = await apiCall({ page, limit, keyword, sort, order });
    setData(newData);
  }, [apiCall, page, limit, keyword, sort, order]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, parms, totalPages };
};

export default usePagination;
