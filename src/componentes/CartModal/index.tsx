import React from 'react';
import styled from 'styled-components';
import { useCart } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faTimes, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 450px;
  max-width: 90vw; /* Garante que não seja muito largo em telas pequenas */
  height: 100%;
  max-height: 100vh; /* A altura máxima será a da tela */
  background-color: #fff;
  padding: 2rem;
  box-shadow: -5px 0 15px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  box-sizing: border-box; /* Garante que o padding seja incluído na altura/largura total */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CartItemsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 1rem;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 1rem;
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

const QuantityButton = styled.button`
  border: 1px solid #ccc;
  background: #f7f7f7;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const QuantityDisplay = styled.span`
  padding: 0 1rem;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  margin-left: auto;
  font-size: 1rem;
`;

const ModalFooter = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

const Total = styled.h3`
  text-align: right;
`;


export function CartModal() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <ModalOverlay onClick={closeCart}>
      {/* impede que um clique dentro do conteúdo do seu modal se propague para o fundo escuro (o overlay) e feche o modal acidentalmente. */}
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Seu Carrinho</h2>
          <CloseButton onClick={closeCart}><FontAwesomeIcon icon={faTimes} /></CloseButton>
        </ModalHeader>

        <CartItemsList>
          {cartItems.length === 0 && <p>Seu carrinho está vazio.</p>}
          
          {cartItems.map(item => (
            <CartItem key={item.id}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <h4>{item.name}</h4> 
                <p>Preço: {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p> 
                <ItemControls>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}><FontAwesomeIcon icon={faMinus} /></QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}><FontAwesomeIcon icon={faPlus} /></QuantityButton>
                  <RemoveButton onClick={() => removeFromCart(item.id)}><FontAwesomeIcon icon={faTrash} /></RemoveButton>
                </ItemControls>
              </ItemInfo>
            </CartItem>
          ))}
        </CartItemsList>

        {cartItems.length > 0 && (
          <ModalFooter>
            <Total>Total: {cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Total>
            <button style={{width: '100%', padding: '1rem', background: '#2ecc71', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Finalizar Compra</button>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}