import Pesquisa from '../../Pesquisa'
import sacola from '../../../assets/sacola.png'
import styled from 'styled-components'

import { useSelector, useDispatch } from 'react-redux';
import { openCart, selectCartItemCount } from '../../../store/slices/cartSlice';

const TopoContainer = styled.div`
    display: flex;
    font-size: ${({ theme }) => theme.tamanhoFonte['5xl']};
    justify-content: space-between ;

`
const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: ${({ theme }) => theme.cores.texto.primario}; 
  font-size: ${({ theme }) => theme.tamanhoFonte['2xl']};
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  top: 50px;
  right: -${({ theme }) => theme.espacamento.sm};
  background-color: ${({ theme }) => theme.cores.promocao};
  color: ${({ theme }) => theme.cores.texto.branco};
  border-radius: ${({ theme }) => theme.raioBorda.redondo};
  width: 22px;
  height: 22px;
  font-size: ${({ theme }) => theme.tamanhoFonte.xs};
  font-weight: ${({ theme }) => theme.pesoFonte.bold};
  display: flex;
  justify-content: center;
  align-items: center;
`;


export default function Topo() {
  
  const dispatch = useDispatch();
  const totalItems = useSelector(selectCartItemCount);

  const handleOpenCart = () => {
    dispatch(openCart());
  };

  return (
    <TopoContainer>
      <p style={{ marginLeft: "2rem" }}>AL SKIN</p>
      <Pesquisa />
     
      <CartButton onClick={handleOpenCart} style={{ background: "none", border: "none", cursor: "pointer", marginRight: "5rem" }}>
        <img src={sacola} alt="Ícone de Sacola"  style={{ width: "3rem", height: "3rem", marginTop: "3rem" }}/>
        {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
      </CartButton>
    </TopoContainer>
  );
}

