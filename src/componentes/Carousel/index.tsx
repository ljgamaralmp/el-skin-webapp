import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Img1 from '../../assets/img1.png';
import Img2 from '../../assets/img2.png';
import Img3 from '../../assets/img3.png';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Animação
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Componentes
export const CarouselSection = styled.section`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 40%, transparent 60%),
              linear-gradient(45deg, #f8f6f3 0%, #e8e4e0 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const CarouselContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

export const CarouselNavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: 0.05s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-2px);
  }
`;

export const CarouselSubtitle = styled.span`
  display: block;
  font-size: 16px;
  color: #8B4A8B;
  margin-bottom: 8px;
  font-weight: 400;
  letter-spacing: 0.5px;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: 0.1s;
`;

export const CarouselTitle = styled.h1`
  font-size: 64px;
  font-weight: 700;
  color: #8B4A8B;
  margin: 0 0 16px 0;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(139, 74, 139, 0.1);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: 0.2s;
`;

export const CarouselDescription = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 32px;
  line-height: 1.5;
  max-width: 400px;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: 0.3s;
`;

export const CarouselCtaButton = styled.button`
  background: linear-gradient(135deg, #8B4A8B 0%, #A855A8 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 16px rgba(139, 74, 139, 0.3);
  text-transform: lowercase;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  animation-delay: 0.4s;

  &:hover {
    background: linear-gradient(135deg, #7A3E7A 0%, #9333EA 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 74, 139, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const CarouselText = styled.div`
  flex: 1;
`;

export const CarouselContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 1000px;
`;

interface CarouselProps {
    legenda:string;
    titulo: string;
    imagem:string;
    descricao:string;
}

export default function Carousel(){

    const items: CarouselProps[] = [{
    legenda:'confira nossa linha',
    titulo:'corporal',
    descricao: 'com benefícios além da hidratação',
    imagem: Img1
  },
  {
    legenda:'toda linha',
    titulo:'anti-age',
    descricao: 'use o cupom ANTIAGE15',
    imagem: Img2,
  },
  {
    legenda:'',
    titulo:'kits incríveis',
    descricao: 'até 50% OFF',
    imagem: Img3,
  }];

  const [idxItemAtual, setIdxItemAtual] = useState(0);

   function previousItem() {
    setIdxItemAtual((prevIdx) => (prevIdx === 0 ? items.length - 1 : prevIdx - 1));
  }

  function nextItem() {
    setIdxItemAtual((prevIdx) => (prevIdx === items.length - 1 ? 0 : prevIdx + 1));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setIdxItemAtual(prevIdxItemAtual => {
        return (prevIdxItemAtual + 1) % items.length;
      });
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

return (
    <CarouselSection
      style={{
        backgroundImage: `url(${items[idxItemAtual].imagem})`
      }}
    >
      <CarouselContainer>
        <CarouselContent>
          <CarouselNavButton aria-label="Anterior" onClick={previousItem}> 
            <FontAwesomeIcon width="60" height="24" icon={faAngleLeft} style={{ color: 'white' }} />
          </CarouselNavButton>
          <CarouselText>
            <CarouselSubtitle>{items[idxItemAtual].legenda}</CarouselSubtitle>
            <CarouselTitle>{items[idxItemAtual].titulo}</CarouselTitle>
            <CarouselDescription>
              {items[idxItemAtual].descricao}
            </CarouselDescription>
            <CarouselCtaButton>
              comprar agora <FontAwesomeIcon icon={faAngleRight} style={{ color: 'white' }} />
            </CarouselCtaButton>
          </CarouselText>
          <CarouselNavButton aria-label="Próximo" onClick={nextItem}>
            <FontAwesomeIcon width="60" height="24" icon={faAngleRight} style={{ color: 'white' }} />
          </CarouselNavButton>
        </CarouselContent>
      </CarouselContainer>
    </CarouselSection>
  );

}

