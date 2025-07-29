import Pesquisa from '../../Pesquisa'
import sacola from '../../../assets/sacola.png'
import styled from 'styled-components'
import { useCartContext } from '../../../contexts/CartContext';

const TopoContainer = styled.div`
    display: flex;
    font-size: 3rem;
    justify-content: space-between ;

`
const CartButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  top: 50px;
  right: -12px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  font-size: 0.8rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Topo() {
  const { openCart, cartItems } = useCartContext();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
      <TopoContainer>
        <p style={{ marginLeft: "2rem" }}>AL SKIN</p>
        <Pesquisa />
        <CartButton
          onClick={openCart}
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
          {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
        
        </CartButton>
      </TopoContainer>
    );
}

