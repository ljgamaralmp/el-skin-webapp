import styled from 'styled-components';
import ProductCard from '../ProductCard';
import { useMemo } from 'react'; 
import { useSearch } from '../../hooks/useSearch';
import { Produto } from '../../types/types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

import { useGetProductsQuery } from '../../store/api/apiSlice';

const ShowcaseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
`;

function ProductShowcase() {
  const dispatch = useDispatch();
  const { search } = useSearch();

  const {
    data: todosOsProdutos = [], 
    isLoading,
    isError,
  } = useGetProductsQuery();

  const filteredProducts = useMemo(() => {
    if (!search) {
      return todosOsProdutos; // Se não houver busca, retorna todos
    }
    const lowercasedTerm = search.toLowerCase();
    return todosOsProdutos.filter(produto =>
      produto.name.toLowerCase().includes(lowercasedTerm) ||
      produto.description.toLowerCase().includes(lowercasedTerm)
    );
  }, [todosOsProdutos, search]); // Recalcula apenas se a lista ou a busca mudarem
  if (isLoading) return <p style={{ padding: '20px' }}>Carregando produtos...</p>;
  if (isError) return <p style={{ padding: '20px' }}>Erro ao carregar produtos.</p>;

  function handleProductClick(productId: string) {
    console.log(`Produto clicado: ${productId}`);
  }

  const handleAddToCart = (product: Produto) => {
    dispatch(addToCart(product));
  };

  return (
    <ShowcaseContainer>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((produto) => (
          <ProductCard 
            key={produto.id} 
            produto={produto} 
            onAddToCart={handleAddToCart} 
            onProductClick={handleProductClick} 
          />
        ))
      ) : (
        !isLoading && <p>Nenhum produto encontrado para "{search}".</p>
      )}
    </ShowcaseContainer>
  );
}

export default ProductShowcase;