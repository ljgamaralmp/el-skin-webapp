import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  padding: 0 ${({ theme }) => theme.espacamento.xl};
  min-width: 180px;
`
const ColumnTitle = styled.h3`
  font-size: ${({ theme }) => theme.tamanhoFonte.base};
  font-weight: ${({ theme }) => theme.pesoFonte.bold};
  text-decoration: underline;
  margin-bottom: ${({ theme }) => theme.espacamento.md};
  color: ${({ theme }) => theme.cores.texto.primario};
`
const LinkList = styled.ul`
  cursor: pointer;
  list-style: none; // Remove as bolinhas da lista
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.espacamento.sm};
`
const LinkItem = styled.li`
  font-size: ${({ theme }) => theme.tamanhoFonte.sm};
  color: ${({ theme }) => theme.cores.texto.secundario};

  
  &:hover {
    text-decoration: underline;
  }
`
const footerOpcoes = ['Sobre a AL SKIN', 'Loja AL SKIN', 'Atendimento', 'Blog AL SKIN']
const opcoesConteudo = [['quem somos', 'time AL SKIN', 'carreiras'],
                        ['lojas fisicas', 'devolução'],
                        ['oi@alskin.com.br','ajuda'],
                        ['Minha pele','ingredientes']]

export default function OpcoesFooter() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: "20px",
      }}
    >
      {footerOpcoes.map((titulo, index) => (
        <FooterColumn key={index}>
          <ColumnTitle>{titulo}</ColumnTitle>
          <LinkList>
            {opcoesConteudo[index].map((link, linkIndex) => (
              <LinkItem key={linkIndex}>
                {<Link to={`/sobre`}>{link}</Link>}
              </LinkItem>
            ))}
          </LinkList>
        </FooterColumn>
      ))}
    </div>
  );
}

