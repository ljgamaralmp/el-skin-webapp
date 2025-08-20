// CartModal.tsx
"use client";
import React from 'react';
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
import styles from './CartModal.module.css'; // Importe o CSS Module

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