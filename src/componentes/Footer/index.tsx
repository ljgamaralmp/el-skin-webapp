import redes_sociais from '../../assets/redes_sociais.png' 
import styled from 'styled-components'
import OpcoesFooter from './OpcoesFooter'

const FooterContainer = styled.footer`
    background-color: #F5F5F5;
    align-items: center;    /* 2. Centraliza os itens na horizontal */
    padding: 20px 0;        /* 3. (Opcional) Adiciona um espaçamento para o rodapé respirar */
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

    