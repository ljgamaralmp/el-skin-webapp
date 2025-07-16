import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextType {
  termoDeBusca: string;
  setTermoDeBusca: (termo: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [termoDeBusca, setTermoDeBusca] = useState('');

  return (
    <SearchContext.Provider value={{ termoDeBusca, setTermoDeBusca }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch deve ser usado dentro de um SearchProvider');
  }
  return context;
}