import Input from '../Input'
import lupa from '../../assets/lupa.svg'
import styled from 'styled-components'
import { useSearch } from '../../contexts/SearchContext'



const PesquisaContainer = styled.div`
    background-color: white;
    position: relative;
    display: flex; 
    justify-content: center;
    align-items: center;
    margin-top:25px;
    margin-left: 100px;
`

const IconeLupa = styled.img`
    position: absolute;
    top: 40%;
    right: 20px; 
    transform: translateY(-50%);
    width: 25px;
    height: 25px;
    cursor: pointer;
`



export default function Pesquisa() {
    // 2. Pega o estado e a função de atualização diretamente do contexto
    const { termoDeBusca, setTermoDeBusca } = useSearch();
    return (


            <PesquisaContainer>
                <Input value={termoDeBusca} onChange={(evento) => setTermoDeBusca(evento.target.value)}
                />
                <IconeLupa src={lupa} alt="Ícone de Lupa" />
            </PesquisaContainer>

    )
}