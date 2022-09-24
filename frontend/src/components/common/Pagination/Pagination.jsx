import React, { useState } from 'react';
import { Flex, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { PageButton } from './Pagination.styled';

const FIRST_PAGE = 1;
const PAGE_MAX = 5;

const Pagination = ({ totalPages, parms, setCurrentPage }) => {
  const navigator = useNavigate();
  const { page, limit, keyword, sort, order } = parms;
  const pages = Array(totalPages < PAGE_MAX ? totalPages : PAGE_MAX);
  const [start, setStart] = useState(page > 5 ? page - 4 : page);

  const setPageUrl = nextPage => {
    navigator(`?_page=${nextPage}&_limit=${limit}&q=${keyword}&_sort=${sort}&_order=${order}`);
    setCurrentPage(prev => ({ ...prev, page: nextPage }));
  };

  const moveFirstPage = () => {
    setPageUrl(FIRST_PAGE);
    setStart(FIRST_PAGE);
  };

  const moveEndPage = () => {
    setPageUrl(totalPages);
    setStart(totalPages - 4);
  };

  const prevPage = () => {
    if (page - 1 < FIRST_PAGE) return;
    if (page === start && page !== FIRST_PAGE) {
      if (page - 3 <= FIRST_PAGE) setStart(prev => prev - 1);
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
      {totalPages > PAGE_MAX && (
        <IconButton onClick={moveFirstPage} icon={<ArrowLeftIcon h={3} w={3} />} />
      )}
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
      {totalPages > PAGE_MAX && (
        <IconButton onClick={moveEndPage} icon={<ArrowRightIcon h={3} w={3} />} />
      )}
    </Flex>
  );
};

export default Pagination;
