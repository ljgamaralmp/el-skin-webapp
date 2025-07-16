import styled from 'styled-components';

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start; 
  padding: 0 20px;
  min-width: 180px;
`
const ColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: bold; 
  text-decoration: underline;
  margin-bottom: 16px; // Espaço entre o título e a lista
  color: #333;
`
const LinkList = styled.ul`
  cursor: pointer;
  list-style: none; // Remove as bolinhas da lista
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px; // Espaço entre cada link
`
const LinkItem = styled.li`
  font-size: 14px;
  color: #555;

  
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
                <LinkItem key={linkIndex}>{link}</LinkItem>
              ))}
            </LinkList>
          </FooterColumn>
        ))}
      </div>
    );

}

