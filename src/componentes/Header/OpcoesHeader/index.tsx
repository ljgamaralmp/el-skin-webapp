import styled from 'styled-components'

const Opcao = styled.li`
    font-size: ${({ theme }) => theme.tamanhoFonte['2xl']};
    display: flex;
    justify-content: left;
    align-items: center;
    text-align: left;
    height: 100%;
    padding: 0 ${({ theme }) => theme.espacamento.xxl};
    cursor: pointer;
    min-width: 120px;
    color: ${({ theme }) => theme.cores.texto.secundario};
    transition: color ${({ theme }) => theme.transicoes.rapida};

    &:hover {
        color: ${({ theme }) => theme.cores.primaria};
    }
`

const Opcoes = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    flex-grow: 1;
    justify-content: flex-start;
    
`

const headerOpcoes = ['Categorias', 'Tipos de pele', 'Necessidade', 'Ingredientes']

function OpcoesHeader() {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Opcoes>
                { headerOpcoes.map( (options) => (
                    <Opcao><p>{options}</p></Opcao>
                ) ) }
            </Opcoes> 
            <p style={{ marginRight: '400px', color: 'red' }}>Kits até 50% OFF</p>
        </div>
        
    )
}

export default OpcoesHeader