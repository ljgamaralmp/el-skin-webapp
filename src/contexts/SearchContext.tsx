import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextType {
  termoDeBusca: string;
  setTermoDeBusca: (termo: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

//Provedor de Contexto de Busca
// Ele deve envolver a parte da aplicação que precisa acessar o termo de busca
export function SearchProvider({ children }: { children: ReactNode }) {
  const [termoDeBusca, setTermoDeBusca] = useState('');

  return (
    <SearchContext.Provider value={{ termoDeBusca, setTermoDeBusca }}>
      {children}
    </SearchContext.Provider>
  );
}
// Hook para usar o contexto de busca
// Ele deve ser usado dentro de um SearchProvider
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch deve ser usado dentro de um SearchProvider');
  }
  return context;
}