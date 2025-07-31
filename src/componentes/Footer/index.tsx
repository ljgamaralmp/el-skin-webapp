import redes_sociais from '../../assets/redes_sociais.png' 
import styled from 'styled-components'
import OpcoesFooter from './OpcoesFooter'

const FooterContainer = styled.footer`
    background-color: ${({ theme }) => theme.cores.fundo.cinza};
    align-items: center;    /* 2. Centraliza os itens na horizontal */
    padding: ${({ theme }) => theme.espacamento.xl} 0;
    display: flex;
    flex-direction: column;
`

function Footer() {
    return (
        <FooterContainer>
            <img src={redes_sociais} alt="Redes Sociais" />
            <OpcoesFooter />
        </FooterContainer>
    )
}

export default Footer

    