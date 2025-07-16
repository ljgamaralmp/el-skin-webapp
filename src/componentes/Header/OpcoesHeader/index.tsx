import styled from 'styled-components'

const Opcao = styled.li`
    font-size: 24px;
    display: flex;
    justify-content: left;
    align-items: left;
    text-align: left;
    height: 100%;
    padding: 0 50px;
    cursor: pointer;
    min-width: 120px;
`

const Opcoes = styled.ul`
    display: flex;
    flex-grow: 1; /* Faz a lista ocupar o espaço disponível, empurrando-a para a esquerda */
    justify-content: flex-start; /* Garante que os itens comecem da esquerda */
    
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