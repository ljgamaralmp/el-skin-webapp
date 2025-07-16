import styled from 'styled-components';
import ProductCard from '../ProductCard';

const ShowcaseContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 20px;
`;

interface Produto {
  id: number;
  imagem: string;
  nome: string;
  descricao: string;
  preco: string | number;
}

interface ProductShowcaseProps {
  produtos: Produto[];
}

function ProductShowcase({ produtos }: Readonly<ProductShowcaseProps>) {
  return (
    <ShowcaseContainer>
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </ShowcaseContainer>
  );
}

export default ProductShowcase;
