import styled from 'styled-components';
import ProductCard from '../ProductCard';
import { useEffect, useState } from 'react';
import { useSearch } from '../../hooks/useSearch'; 
import { productService } from '../../service/productService';
import { useCartContext } from '../../contexts/CartContext';
import { Produto } from '../../types/types';


const ShowcaseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
`;

function ProductShowcase() {
  const [todosOsProdutos, setTodosOsProdutos] = useState<Produto[]>([]); 
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 //'search' vem diretamente do store.
  const { search } = useSearch();
  const { addToCart } = useCartContext(); // Contexto do carrinho permanece o mesmo.

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const produtos = await productService.getProducts();
        setTodosOsProdutos(produtos); 
        setProdutosFiltrados(produtos);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Ocorreu um erro desconhecido.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, []); 

  // reage à variável 'search' do Redux.
  useEffect(() => {
    // 'search' em vez de 'termoDeBusca'
    const termo = search.toLowerCase();
    
    const resultadoFiltro = todosOsProdutos.filter(produto =>
      produto.name.toLowerCase().includes(termo) ||
      produto.description.toLowerCase().includes(termo)
    );
    
    setProdutosFiltrados(resultadoFiltro);
  // A dependência do useEffect é a variável 'search' do Redux
  }, [search, todosOsProdutos]); 

  if (loading) return <p style={{ padding: '20px' }}>Carregando produtos...</p>;
  if (error) return <p style={{ padding: '20px' }}>Erro ao carregar produtos: {error}</p>;

  function handleProductClick(productId: string) {
    console.log(`Produto clicado: ${productId}`);
  }

  return (
    <ShowcaseContainer>
      {produtosFiltrados.length > 0 ? (
        produtosFiltrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} onAddToCart={addToCart} onProductClick={handleProductClick} />
        ))
      ) : (
        //Também usa a variável 'search'.
        <p>Nenhum produto encontrado para "{search}".</p>
      )}
    </ShowcaseContainer>
  );
}

export default ProductShowcase;