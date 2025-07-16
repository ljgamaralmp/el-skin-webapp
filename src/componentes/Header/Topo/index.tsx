import Pesquisa from '../../Pesquisa'
import sacola from '../../../assets/sacola.png'
import styled from 'styled-components'

const TopoContainer = styled.div`
    display: flex;
    font-size: 3rem;
    justify-content: space-between ;

`

export default function Topo() {
    return (
      <TopoContainer>
        <p style={{ marginLeft: "2rem" }}>AL SKIN</p>
        <Pesquisa />
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "5rem",
          }}
        >
          <img
            src={sacola}
            alt="Ícone de Sacola"
            style={{ width: "3rem", height: "3rem", marginTop: "3rem" }}
          />
        </button>
      </TopoContainer>
    );
}

