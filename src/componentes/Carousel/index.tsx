"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useGetCarouselItemsQuery } from "../../store/api/apiSlice";
import styles from './Carousel.module.css'; // Importe o CSS Module

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
