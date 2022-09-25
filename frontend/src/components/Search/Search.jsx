import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@chakra-ui/react';

const Search = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [word, setWord] = useState('');

  const handleSearch = () => {
    const { limit } = currentPage;
    setCurrentPage(prev => ({ ...prev, keyword: word }));
    navigate(`?_page=1&_limit=${limit}&q=${word}`);
  };
  const handleChangeKeyword = e => {
    const { value } = e.target;
    setWord(value);
  };
  return (
    <>
      <Input name="search" value={word} onChange={handleChangeKeyword} />
      <Button type="Button" colorScheme="blue" onClick={handleSearch}>
        검색
      </Button>
    </>
  );
};

export default Search;
