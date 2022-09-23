import React, { useState } from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { PageButton } from './Pagination.styled';

const Pagination = ({ totalPages, parms }) => {
  const navigator = useNavigate();
  const { page, limit, keyword, sort, order } = parms;
  const pages = Array(totalPages < 5 ? totalPages : 5);
  const [start, setStart] = useState(page > 5 ? page - 4 : page);

  const setPageUrl = nextPage => {
    navigator(`?_page=${nextPage}&_limit=${limit}&_q=${keyword}&_sort=${sort}&_order=${order}`);
  };

  const moveFirstPage = () => {
    setPageUrl(1);
    setStart(1);
  };

  const moveEndPage = () => {
    setPageUrl(totalPages);
    setStart(totalPages - 4);
  };

  const prevPage = () => {
    if (page - 1 < 1) return;
    if (page === start && page !== 1) {
      if (page - 3 <= 1) setStart(prev => prev - 1);
      else setStart(prev => prev - 3);
    }
    setPageUrl(page - 1);
  };

  const nextPage = () => {
    if (page + 1 > totalPages) return;
    if (page === start + 4 && page !== totalPages) {
      if (page + 3 >= totalPages) setStart(prev => prev + 1);
      else setStart(prev => prev + 3);
    }
    setPageUrl(page + 1);
  };

  return (
    <Flex>
      <IconButton onClick={moveFirstPage} icon={<ArrowLeftIcon h={3} w={3} />} />
      <IconButton onClick={prevPage} icon={<ChevronLeftIcon h={6} w={6} />} />
      {pages.fill().map((_, i) => (
        <PageButton
          key={i}
          w={6}
          _hover={{
            opacity: 1,
          }}
          onClick={() => setPageUrl(i + start)}
          disabled={page === i + start}
        >
          {i + start}
        </PageButton>
      ))}
      <IconButton onClick={nextPage} icon={<ChevronRightIcon h={6} w={6} />} />
      <IconButton onClick={moveEndPage} icon={<ArrowRightIcon h={3} w={3} />} />
    </Flex>
  );
};

export default Pagination;
