import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store'; 
import { setSearch, clearSearch } from '../store/slices/searchSlice'; 

export const useSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.search);

  const setSearchTerm = useCallback((term: string) => {
    dispatch(setSearch(term));
  }, [dispatch]);

  const clearSearchTerm = useCallback(() => {
    dispatch(clearSearch());
  }, [dispatch]);

  return {
    search: searchTerm,
    setSearch: setSearchTerm,
    clearSearch: clearSearchTerm,
  };
};