import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';

const Search = ({ currentPage, setCurrentPage }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [word, setWord] = useState('');
  useEffect(() => {
    setCurrentPage(prev => ({
      ...prev,
      page: new URLSearchParams(search).get('_page') || 1,
      limit: new URLSearchParams(search).get('_limit') || 20,
      keyword: new URLSearchParams(search).get('q') || '',
    }));
  }, []);
  const handleSearch = () => {
    const { page, limit } = currentPage;
    setCurrentPage(prev => ({ ...prev, keyword: word }));
    navigate(`?_page=${page}&_limit=${limit}&q=${word}`);
  };
  const handleChangeKeyword = e => {
    const { value } = e.target;
    setWord(value);
  };

  return (
    <>
      <Input name="search" value={word} onChange={handleChangeKeyword} />
      <Button type="Button" onClick={handleSearch}>
        검색
      </Button>
    </>
  );
};

export default Search;
