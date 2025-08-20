
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Produto } from '../../types/types';
import { useSearch } from '../../hooks/useSearch';
import { addToCart } from '../../store/slices/cartSlice';
import { useGetProductsQuery } from '../../store/api/apiSlice';

import ProductCard from '../ProductCard';
import styles from './ProductShowcase.module.css'; // Importe o CSS Module

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
      return todosOsProdutos;
    }
    const lowercasedTerm = search.toLowerCase();
    return todosOsProdutos.filter(produto =>
      produto.name.toLowerCase().includes(lowercasedTerm) ||
      produto.description.toLowerCase().includes(lowercasedTerm)
    );
  }, [todosOsProdutos, search]);

  if (isLoading) return <p className={styles.message}>Carregando produtos...</p>;
  if (isError) return <p className={styles.message}>Erro ao carregar produtos.</p>;

  function handleProductClick(productId: string) {
    console.log(`Produto clicado: ${productId}`);
  }

  const handleAddToCart = (product: Produto) => {
    dispatch(addToCart(product));
  };

  return (
    <div className={styles.showcaseContainer}>
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
        !isLoading && <p className={styles.message}>Nenhum produto encontrado para "{search}".</p>
      )}
    </div>
  );
}

export default ProductShowcase;