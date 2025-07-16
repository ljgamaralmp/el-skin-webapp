import styled from 'styled-components'

const Card = styled.div`
  border: 1px  #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 280px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`  
const Image = styled.img`
  width: 100%;
  height: auto;
`
const Info = styled.div`
  padding: 16px;
  text-align: center;
  
`
const Title = styled.h3`
  font-size: 1.2em;
  margin: 0 0 8px;
`
const Price = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  color: #333;
  margin: 5px;
  display: flex;
`
const Description = styled.p`
  font-size: 16px;
  color: #666;
`
const Button = styled.button`
  background-color:rgb(151, 22, 184);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;
  margin-left: 80px;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color:rgb(223, 176, 228);
  }
`

interface Produto {
  imagem: string;
  nome: string;
  descricao: string;
  preco: string | number;
}

interface ProductCardProps {
  produto: Produto;
}

function ProductCard({ produto }: ProductCardProps) {

  return (
    <Card>
      <Image src={produto.imagem} alt={produto.nome} />
      <Info>
        <Title>{<p>{produto.nome}</p>}</Title>
        <Description><p>{produto.descricao}</p></Description>
        <Price>{<p>{produto.preco}</p>} <Button>comprar</Button></Price>
      </Info>
    </Card>
  )
}

export default ProductCard 
