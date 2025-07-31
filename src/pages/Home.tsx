import styled from 'styled-components';
import Carousel from '../componentes/Carousel';
import ProductShowcase from '../componentes/ProductShowcase';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Poppins', sans-serif;
`;


export default function Home() {
  return (
    <PageContainer>
        <Carousel />
        <ProductShowcase />
    </PageContainer>
  );
}

