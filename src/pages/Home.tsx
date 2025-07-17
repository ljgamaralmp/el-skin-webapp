import styled from 'styled-components';
import Footer from '../componentes/Footer';
import Header from '../componentes/Header';
import Carousel from '../componentes/Carousel';
import ProductShowcase from '../componentes/ProductShowcase';
import dadosProdutos from '../componentes/dadosProdutos.js'; 
import { useState, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
`;


export default function Home() {
  //Pega o termo de busca diretamente do contexto
  const { termoDeBusca } = useSearch();
  
  const [produtosFiltrados, setProdutosFiltrados] = useState(dadosProdutos);

  //useEffect reage à mudança do termo de busca para filtrar a lista
  useEffect(() => {
    const termo = typeof termoDeBusca === 'string' ? termoDeBusca : '';
    const termoNormalizado = termo.toLowerCase();

    if (termoNormalizado) {
      const resultadoFiltro = dadosProdutos.filter(produto => 
        produto.nome.toLowerCase().includes(termoNormalizado)
      );
      setProdutosFiltrados(resultadoFiltro);
    } else {
      // Se a busca estiver vazia, mostra todos os produtos
      setProdutosFiltrados(dadosProdutos);
    }
  }, [termoDeBusca]);
  return (
    <PageContainer>
        <Carousel />
        <ProductShowcase produtos={produtosFiltrados} />
    </PageContainer>
  );
}

