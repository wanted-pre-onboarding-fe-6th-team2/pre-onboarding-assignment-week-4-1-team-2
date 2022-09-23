import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Search = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState({
    page: new URLSearchParams(search).get('_page') || 1,
    limit: new URLSearchParams(search).get('_limit') || 20,
    keyword: new URLSearchParams(search).get('q') || '',
  });
  const { page, limit, keyword } = currentPage;

  const handleSearch = () => {
    navigate(`?_page=${page}&_limit=${limit}&q=${keyword}`);
  };
  const handleChangeKeyword = e => {
    const { value } = e.target;
    setCurrentPage(prev => ({ ...prev, keyword: value }));
  };

  return (
    <div>
      <input name="search" value={keyword} onChange={handleChangeKeyword} />
      <button type="button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
};

export default Search;
