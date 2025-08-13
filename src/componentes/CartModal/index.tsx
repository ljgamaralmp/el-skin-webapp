import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeCart,
  removeFromCart,
  updateQuantity,
  selectIsCartOpen,
  selectCartItems,
  selectCartTotal
} from '../../store/slices/cartSlice';
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
  max-width: 90vw; 
  height: 100%;
  max-height: 100vh; 
  background-color: ${({ theme }) => theme.cores.fundo.branco};
  padding: ${({ theme }) => theme.espacamento.xl};
  box-shadow: ${({ theme }) => theme.sombras.carrinho};
  display: flex;
  flex-direction: column;
  box-sizing: border-box; 
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.cores.borda.clara};
  padding-bottom: ${({ theme }) => theme.espacamento.md};
  margin-bottom: ${({ theme }) => theme.espacamento.md};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.cores.primaria};
  color: ${({ theme }) => theme.cores.texto.branco};
  border: none;
  border-radius: ${({ theme }) => theme.raioBorda.sm};
  padding: ${({ theme }) => theme.espacamento.sm} ${({ theme }) => theme.espacamento.md};
  cursor: pointer;
  font-size: ${({ theme }) => theme.tamanhoFonte.sm};
  font-weight: ${({ theme }) => theme.pesoFonte.bold};
  transition: background-color ${({ theme }) => theme.transicoes.rapida};

  &:hover {
    background-color: ${({ theme }) => theme.cores.primariaClara};
  }
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
  //dados diretamente do store do Redux com os seletores
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItems = useSelector(selectCartItems); 
  const cartTotal = useSelector(selectCartTotal);
  
  
  const dispatch = useDispatch();

  if (!isCartOpen) return null;

  //Funções que agora despacham ações para o Redux
  const handleCloseCart = () => dispatch(closeCart());
  const handleRemoveFromCart = (id: number) => dispatch(removeFromCart(id));
  const handleUpdateQuantity = (id: number, quantity: number) => dispatch(updateQuantity({ productId: id, quantity }));

  return (
    <ModalOverlay onClick={handleCloseCart} data-testid="modal-overlay">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>Seu Carrinho</h2>
          <CloseButton onClick={handleCloseCart} data-testid="close-button">
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
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
                  
                  <QuantityButton onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} data-testid="minus-button">
                    <FontAwesomeIcon icon={faMinus} />
                  </QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} data-testid="plus-button">
                    <FontAwesomeIcon icon={faPlus} />
                  </QuantityButton>
                  <RemoveButton onClick={() => handleRemoveFromCart(item.id)} data-testid="remove-button">
                    <FontAwesomeIcon icon={faTrash} />
                  </RemoveButton>
                </ItemControls>
              </ItemInfo>
            </CartItem>
          ))}
        </CartItemsList>

        {cartItems.length > 0 && (
          <ModalFooter>
            <Total>Total: {cartTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Total>
            <Button>Finalizar Compra</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </ModalOverlay>
  );
}