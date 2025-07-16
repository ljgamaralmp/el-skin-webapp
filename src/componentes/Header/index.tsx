import OpcoesHeader from './OpcoesHeader'
import Topo from './Topo' 
import styled from 'styled-components'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: column;
    justify-content: center;
`

function Header() {
    return (
        <header>
            <HeaderContainer>
                <Topo/>
                <OpcoesHeader/>
            </HeaderContainer>
        </header>
    )
}

export default Header