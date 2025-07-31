import React from 'react';
import styled from 'styled-components';
import { useCartContext } from '../../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faTimes, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.cores.carrinho.overlay};
  display: flex;
  justify-content: flex-end;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled.div`
  width: 450px;
  max-width: 90vw; /* Garante que não seja muito largo em telas pequenas */
  height: 100%;
  max-height: 100vh; /* A altura máxima será a da tela */
  background-color: ${({ theme }) => theme.cores.fundo.branco};
  padding: ${({ theme }) => theme.espacamento.xl};
  box-shadow: ${({ theme }) => theme.sombras.carrinho};
  display: flex;
  flex-direction: column;
  box-sizing: border-box; /* Garante que o padding seja incluído na altura/largura total */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.cores.borda.clara};
  padding-bottom: ${({ theme }) => theme.espacamento.md};
  margin-bottom: ${({ theme }) => theme.espacamento.md};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.tamanhoFonte['2xl']};
  cursor: pointer;
  color: ${({ theme }) => theme.cores.texto.terciario};
  transition: color ${({ theme }) => theme.transicoes.rapida};

  &:hover {
    color: ${({ theme }) => theme.cores.texto.primario};
  }
`;

const CartItemsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const CartItem = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.espacamento.md};
  border-bottom: 1px solid ${({ theme }) => theme.cores.borda.escura};
  padding-bottom: ${({ theme }) => theme.espacamento.md};
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: ${({ theme }) => theme.espacamento.md};
  border-radius: ${({ theme }) => theme.raioBorda.md};
`;

const ItemInfo = styled.div`
  flex-grow: 1;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${({ theme }) => theme.espacamento.sm};
`;

const QuantityButton = styled.button`
  border: 1px solid ${({ theme }) => theme.cores.borda.media};
  background: ${({ theme }) => theme.cores.fundo.cinza};
  width: 30px;
  height: 30px;
  border-radius: ${({ theme }) => theme.raioBorda.sm};
  transition: background-color ${({ theme }) => theme.transicoes.rapida};

  &:hover {
    background-color: ${({ theme }) => theme.cores.botao.hover};
  }
`;

const QuantityDisplay = styled.span`
  padding: 0 ${({ theme }) => theme.espacamento.md};
  font-weight: ${({ theme }) => theme.pesoFonte.bold};
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.cores.carrinho.remover};
  cursor: pointer;
  margin-left: auto;
  font-size: ${({ theme }) => theme.tamanhoFonte.base};
  transition: transform ${({ theme }) => theme.transicoes.rapida};
  
  &:hover {
    transform: scale(1.1);
  }
`;

const ModalFooter = styled.div`
  padding-top: ${({ theme }) => theme.espacamento.md};
  border-top: 1px solid ${({ theme }) => theme.cores.borda.clara};
`;

const Total = styled.h3`
  text-align: right;
  font-size: ${({ theme }) => theme.tamanhoFonte.lg};
`;


export function CartModal() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, cartTotal } = useCartContext();

  if (!isCartOpen) return null;

  return (
    <ModalOverlay onClick={closeCart} data-testid="modal-overlay">
      {/* impede que um clique dentro do conteúdo do seu modal se propague para o fundo escuro (o overlay) e feche o modal acidentalmente. */}
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Seu Carrinho</h2>
          <CloseButton onClick={closeCart} data-testid="close-button"><FontAwesomeIcon icon={faTimes} /></CloseButton>
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
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)} data-testid="minus-button"><FontAwesomeIcon icon={faMinus} /></QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)} data-testid="plus-button"><FontAwesomeIcon icon={faPlus} /></QuantityButton>
                  <RemoveButton onClick={() => removeFromCart(item.id)} data-testid="remove-button"><FontAwesomeIcon icon={faTrash} /></RemoveButton>
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