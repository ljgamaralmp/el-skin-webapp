import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/index'; 
import { fetchProducts, fetchProductById } from '../store/slices/productSlice'; 
import { Produto } from '../types/types'; 

export const useProducts = (searchTerm?: string) => {
  
  const dispatch: AppDispatch = useDispatch();
  const {
    products,
    loading,
    error,
    currentProduct,
    currentProductLoading,
  } = useSelector((state: RootState) => state.products);

  // useCallback para garantir que a referência da função seja estável
  const loadProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const loadProductById = useCallback((id: string) => {
    dispatch(fetchProductById(id));
  }, [dispatch]);
  
const getProductById = useCallback((id: string): Produto | undefined => {

  const numericId = Number(id);
  return products.find(p => p.id === numericId);
}, [products]);


  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products; 
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return products.filter(produto =>
      produto.name.toLowerCase().includes(lowercasedTerm) ||
      produto.description.toLowerCase().includes(lowercasedTerm)
    );
  }, [products, searchTerm]);


  return {
    allProducts: products, // A lista completa de produtos
    filteredProducts,      // A lista já filtrada e memoizada
    currentProduct,        // O produto único buscado por ID
    
    isLoadingList: loading === 'pending' || loading === 'idle',
    isLoadingCurrent: currentProductLoading === 'pending',
    error,

    loadProducts,
    loadProductById,
    getProductById,
  };
};