import React from 'react';
import styled from 'styled-components';
import Sobre1 from '../assets/about1.png';

const PaginaSobreContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: 'Arial', sans-serif;
`;

const ConteudoSobre = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-bottom: 80px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }
`;

const SecaoTexto = styled.div`
  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333; /* Cor primária do texto */
    margin-bottom: 40px;
    line-height: 1.2;

    @media (max-width: 768px) {
      font-size: 2rem;
      margin-bottom: 30px;
    }

    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }
`;

const ArtigoSobre = styled.div`
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 1.1rem;
    font-weight: bold;
    color: #333; /* Cor primária do texto */
    margin-bottom: 15px;
    letter-spacing: 0.5px;
    text-transform: uppercase;

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.8;
    color: #666; /* Cor secundária do texto */
    margin: 0;

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }
`;

const SecaoImagens = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const ImagemProdutoContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImagemProduto = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
`;

const SecaoContato = styled.div`
  text-align: center;
  padding: 60px 40px;
  background-color: #f9f9f9; /* Cor de fundo clara */
  border-radius: 20px;

  @media (max-width: 768px) {
    padding: 40px 20px;
    margin: 0 10px;
  }

  @media (max-width: 480px) {
    border-radius: 15px;
  }

  h2 {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333; /* Cor primária do texto */
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 0.5px;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  p {
    font-size: 1rem;
    color: #666; /* Cor secundária do texto */
    margin-bottom: 30px;
    line-height: 1.6;
  }
`;

const BotaoContato = styled.button`
  background: linear-gradient(135deg, #8B5A96, #A67CB0);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 20px rgba(139, 90, 150, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(139, 90, 150, 0.4);
  }

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 0.9rem;
  }
`;

const IconeContato = styled.span`
  font-size: 1.2rem;
`;

const Sobre: React.FC = () => {
  return (
    <PaginaSobreContainer>
      <ConteudoSobre>
        <SecaoTexto>
          <h1>Sobre a AL SKIN</h1>
          
          <ArtigoSobre>
            <h2>QUEM SOMOS</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem 
              accusantium doloremque laudantium, totam rem aperiam, eaque 
              ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae 
              dicta sunt explicabo.
            </p>
          </ArtigoSobre>

          <ArtigoSobre>
            <h2>POR QUE EXISTIMOS?</h2>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit 
              aut fugit, sed quia consequuntur magni dolores eos qui ratione 
              voluptatem sequi nesciunt.
            </p>
          </ArtigoSobre>

          <ArtigoSobre>
            <h2>O QUE A GENTE FAZ?</h2>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi 
              tempora incidunt ut labore et dolore magnam aliquam quaerat 
              voluptatem.
            </p>
          </ArtigoSobre>
        </SecaoTexto>

        <SecaoImagens>
          <ImagemProdutoContainer>
            <ImagemProduto 
              src={Sobre1} 
              alt="Produto AL SKIN sendo aplicado"
            />
          </ImagemProdutoContainer>
        </SecaoImagens>
      </ConteudoSobre>

      <SecaoContato>
        <h2>VAMOS CONVERSAR?</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
        
        <BotaoContato>
          <IconeContato>💬</IconeContato>
          <span>Fale conosco</span>
        </BotaoContato>
      </SecaoContato>
    </PaginaSobreContainer>
  );
};

export default Sobre;