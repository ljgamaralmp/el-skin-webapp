import styled from 'styled-components'
import { Produto } from '../../types/types'

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.cores.borda.media};
  border-radius: ${({ theme }) => theme.raioBorda.md};
  overflow: hidden;
  width: 280px;
  box-shadow: ${({ theme }) => theme.sombras.sm};
  display: flex;
  flex-direction: column;
`  
const Image = styled.img`
  width: 100%;
  height: auto;
`
const Info = styled.div`
  padding: ${({ theme }) => theme.espacamento.md};
  text-align: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* Faz esta área crescer para preencher o espaço */
  
`
const Title = styled.h3`
  font-size: ${({ theme }) => theme.tamanhoFonte.lg};
  margin: 0 0 ${({ theme }) => theme.espacamento.sm};
`
const Price = styled.p`
  font-size: ${({ theme }) => theme.tamanhoFonte.base};
  font-weight: ${({ theme }) => theme.pesoFonte.bold};
  color: ${({ theme }) => theme.cores.texto.primario};
  margin: ${({ theme }) => theme.espacamento.sm} 0;
  display: flex;
  align-items: center; /* Alinha o botão com o preço */
  justify-content: space-between; /* Espaça o preço e o botão */
`
const Description = styled.p`
  font-size: ${({ theme }) => theme.tamanhoFonte.sm};
  color: ${({ theme }) => theme.cores.texto.secundario};
  flex-grow: 1; /* Ocupa o espaço disponível, empurrando o rodapé para baixo */
  margin-bottom: ${({ theme }) => theme.espacamento.md};
`
const Button = styled.button`
  background-color: ${({ theme }) => theme.cores.primaria};
  color: ${({ theme }) => theme.cores.texto.branco};
  border: none;
  border-radius: ${({ theme }) => theme.raioBorda.sm};
  padding: ${({ theme }) => theme.espacamento.sm} ${({ theme }) => theme.espacamento.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.tamanhoFonte.sm};
  font-weight: ${({ theme }) => theme.pesoFonte.bold};
  transition: background-color ${({ theme }) => theme.transicoes.rapida};

  &:hover {
    background-color: ${({ theme }) => theme.cores.primariaClara};
  }
`;

interface ProductCardProps {
  produto: Produto;
  onAddToCart: (produto: Produto) => void;
  onProductClick: (productId: string) => void;
}

function ProductCard({ produto, onAddToCart, onProductClick }: ProductCardProps) {

  return (
    <Card data-testid="product-card" onClick={() => onProductClick(String(produto.id))}>
      <Image src={produto.image} alt={produto.name} />
      <Info>
        <Title>{<p>{produto.name}</p>}</Title>
        <Description><p>{produto.description}</p></Description>
        <Price>{<p>{produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>} <Button data-testid="add-to-cart-button" onClick={() => onAddToCart(produto)}>Adicionar à sacola</Button></Price>
      </Info>
    </Card>
  )
}

export default ProductCard 
