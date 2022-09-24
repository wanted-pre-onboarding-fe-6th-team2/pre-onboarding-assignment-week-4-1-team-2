import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, Flex, Container } from '@chakra-ui/react';

const Search = ({ currentPage, setCurrentPage }) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { page, limit } = currentPage;
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
    setCurrentPage(prev => ({ ...prev, keyword: word }));
    navigate(`?_page=${page}&_limit=${limit}&q=${word}`);
  };
  const handleChangeKeyword = e => {
    const { value } = e.target;
    setWord(value);
  };

  return (
    <Container maxW="md">
      <Flex>
        <Input name="search" value={word} onChange={handleChangeKeyword} />
        <Button type="Button" onClick={handleSearch}>
          검색
        </Button>
      </Flex>
    </Container>
  );
};

export default Search;
