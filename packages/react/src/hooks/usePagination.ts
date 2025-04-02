import { useMemo } from 'react';

interface UsePaginationProps {
  /** 1 or greater */
  currentPage: number;
  /** 1 or greater */
  totalPages: number;
  maxVisiblePageButtons: number;
}

interface UsePaginationReturn {
  pageNumbers: number[];
  currentGroupIdx: number;
  totalGroupLength: number;
  isLastGroup: boolean;
}

/**
 * values are not index, but literal page number
 */
export function usePagination({
  currentPage,
  totalPages,
  maxVisiblePageButtons,
}: UsePaginationProps): UsePaginationReturn {
  const currentGroupIdx = useMemo(
    () => Math.floor((currentPage - 1) / maxVisiblePageButtons),
    [currentPage, maxVisiblePageButtons]
  );
  const totalGroupLength = useMemo(
    () => Math.ceil(totalPages / maxVisiblePageButtons),
    [totalPages, maxVisiblePageButtons]
  );
  const isLastGroup = useMemo(
    () => currentGroupIdx === totalGroupLength - 1,
    [currentGroupIdx, totalGroupLength]
  );

  const pageNumbers = useMemo(
    () =>
      Array.from(
        {
          length: isLastGroup
            ? totalPages - currentGroupIdx * maxVisiblePageButtons
            : maxVisiblePageButtons,
        },
        (_, i) => currentGroupIdx * maxVisiblePageButtons + i + 1
      ),
    [isLastGroup, totalPages, currentGroupIdx, maxVisiblePageButtons]
  );

  return {
    pageNumbers,
    currentGroupIdx,
    totalGroupLength,
    isLastGroup,
  };
}
