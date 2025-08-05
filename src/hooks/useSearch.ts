import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { setSearch, clearSearch } from '../store/slices/searchSlice';

export const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector((state: RootState) => state.search.search);

  const updateSearch = (term: string) => {
    dispatch(setSearch(term));
  };

  const resetSearch = () => {
    dispatch(clearSearch());
  };

  return {
    search,
    setSearch: updateSearch,
    clearSearch: resetSearch,
  };
};