import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useGetCarouselItemsQuery } from "../../store/api/apiSlice";

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

export const CarouselSection = styled.section`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  background: 
    ${({ theme }) => theme.cores.gradientePrimario},
    linear-gradient(45deg, ${({ theme }) => theme.cores.fundo.claro} 0%, #e8e4e0 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, ${({ theme }) => theme.cores.sombra.clara} 0%, transparent 50%);
    pointer-events: none;
  }
`;

export const CarouselContainer = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.pontosQuebra.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.espacamento.xl};
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;

export const CarouselNavButton = styled.button`
  background: ${({ theme }) => theme.cores.sombra.clara};
  border: 1px solid ${({ theme }) => theme.cores.sombra.media};
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.raioBorda.md};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transicoes.normal};
  backdrop-filter: blur(10px);
  animation: ${fadeInUp} ${({ theme }) => theme.transicoes.lenta} forwards;
  animation-delay: 0.05s;

  &:hover {
    background: ${({ theme }) => theme.cores.sombra.primaria};
    transform: translateX(-2px);
  }
`;

export const CarouselSubtitle = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.tamanhoFonte.base};
  color: ${({ theme }) => theme.cores.primaria};
  margin-bottom: ${({ theme }) => theme.espacamento.sm};
  font-weight: ${({ theme }) => theme.pesoFonte.normal};
  letter-spacing: 0.5px;
  animation: ${fadeInUp} ${({ theme }) => theme.transicoes.lenta} forwards;
  animation-delay: 0.1s;
`;

export const CarouselTitle = styled.h1`
  font-size: ${({ theme }) => theme.tamanhoFonte['6xl']};
  font-weight: ${({ theme }) => theme.pesoFonte.bold};
  color: ${({ theme }) => theme.cores.primaria};
  margin: 0 0 ${({ theme }) => theme.espacamento.md} 0;
  line-height: ${({ theme }) => theme.alturaLinha.justa};
  text-shadow: 2px 2px 4px ${({ theme }) => theme.cores.sombra.media};
  animation: ${fadeInUp} ${({ theme }) => theme.transicoes.lenta} forwards;
  animation-delay: 0.2s;
`;

export const CarouselDescription = styled.p`
  font-size: ${({ theme }) => theme.tamanhoFonte.base};
  color: ${({ theme }) => theme.cores.texto.secundario};
  margin-bottom: ${({ theme }) => theme.espacamento.md};
  line-height: 1.5;
  max-width: 400px;
  animation: ${fadeInUp} ${({ theme }) => theme.transicoes.lenta} forwards;
  animation-delay: 0.3s;
`;

export const CarouselCtaButton = styled.button`
  background: linear-gradient(135deg, ${({ theme }) => theme.cores.primaria} 0%, ${({ theme }) => theme.cores.secundaria} 100%);
  color: ${({ theme }) => theme.cores.texto.branco};
  border: none;
  padding: ${({ theme }) => theme.espacamento.md} ${({ theme }) => theme.espacamento.xl};
  border-radius: ${({ theme }) => theme.raioBorda.pilula};
  font-size: ${({ theme }) => theme.tamanhoFonte.base};
  font-weight: ${({ theme }) => theme.pesoFonte.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transicoes.normal};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.espacamento.sm};
  box-shadow: ${({ theme }) => theme.sombras.primaria};
  text-transform: lowercase;
  animation: ${fadeInUp} ${({ theme }) => theme.transicoes.lenta} forwards;
  animation-delay: 0.4s;

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.cores.sombra.clara} 0%, ${({ theme }) => theme.cores.sombra.primaria} 100%);
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.sombras.primariaHover};
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
  gap: ${({ theme }) => theme.espacamento.xl};
  max-width: 1000px;
`;
interface CarouselProps {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: string;
}

export default function Carousel() {
  const {
      data: items = [], 
      isLoading,
      isError,
      error,
    } = useGetCarouselItemsQuery();


  const [idxItemAtual, setIdxItemAtual] = useState<number>(0);

  useEffect(() => {
    if (!isLoading && items.length > 0) {
      const timer = setInterval(() => {
        setIdxItemAtual((prevIdx) => (prevIdx + 1) % items.length);
      }, 4000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [items, isLoading]);

  const irParaProximo = () => {
    setIdxItemAtual((prevIdx) => (prevIdx + 1) % items.length);
  };

  const irParaAnterior = () => {
    setIdxItemAtual((prevIdx) =>
      prevIdx === 0 ? items.length - 1 : prevIdx - 1
    );
  };

  if (isLoading) {
    return <div>Carregando carrossel...</div>;
  }

  if (isError) {
    return <div>Erro: {error.toString()}</div>;
  }

  const itemAtual = items[idxItemAtual];

  return (
    <CarouselSection
      style={{
        backgroundImage: `url(${itemAtual.backgroundImage})`,
      }}
    >
      <CarouselContainer>
        <CarouselContent>
          <CarouselNavButton aria-label="Anterior" onClick={irParaAnterior}>
            <FontAwesomeIcon
              width="60"
              height="24"
              icon={faAngleLeft}
              style={{ color: "white" }}
            />
          </CarouselNavButton>
          <CarouselText>
            <CarouselSubtitle>{itemAtual.subtitle}</CarouselSubtitle>
            <CarouselTitle>{itemAtual.title}</CarouselTitle>
            <CarouselDescription>{itemAtual.description}</CarouselDescription>
            <CarouselCtaButton>
              comprar agora{" "}
              <FontAwesomeIcon icon={faAngleRight} style={{ color: "white" }} />
            </CarouselCtaButton>
          </CarouselText>
          <CarouselNavButton aria-label="Próximo" onClick={irParaProximo}>
            <FontAwesomeIcon
              width="60"
              height="24"
              icon={faAngleRight}
              style={{ color: "white" }}
            />
          </CarouselNavButton>
        </CarouselContent>
      </CarouselContainer>
    </CarouselSection>
  );
}
