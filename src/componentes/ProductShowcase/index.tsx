import styled from 'styled-components';
import ProductCard from '../ProductCard';
import { useEffect, useState } from 'react';
import { useSearch } from '../../contexts/SearchContext'; 
import { productService } from '../../service/productService';


interface Produto {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string | number;
  tags: Array<{
    label: string;
    type: 'protection' | 'face';
  }>;
}

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

  const { termoDeBusca } = useSearch();

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

  useEffect(() => {
    const termo = termoDeBusca.toLowerCase();
    
    const resultadoFiltro = todosOsProdutos.filter(produto =>
      produto.name.toLowerCase().includes(termo) ||
      produto.description.toLowerCase().includes(termo)
    );
    
    setProdutosFiltrados(resultadoFiltro);
  }, [termoDeBusca, todosOsProdutos]); 

  if (loading) return <p style={{ padding: '20px' }}>Carregando produtos...</p>;
  if (error) return <p style={{ padding: '20px' }}>Erro ao carregar produtos: {error}</p>;

  return (
    <ShowcaseContainer>
      {produtosFiltrados.length > 0 ? (
        produtosFiltrados.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))
      ) : (
        <p>Nenhum produto encontrado para "{termoDeBusca}".</p>
      )}
    </ShowcaseContainer>
  );
}

export default ProductShowcase;