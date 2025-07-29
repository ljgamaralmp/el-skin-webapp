import { renderHook, act } from '@testing-library/react';
import { useCart } from './useCart';
import { Produto as Product } from '../types/types';

// Produto mock para usar nos testes
const mockProduct1: Product = {
  id: 1,
  name: 'Produto Teste 1',
  description: 'Desc',
  price: 100,
  image: 'img1.jpg',
  tags: []
};

const mockProduct2: Product = {
  id: 2,
  name: 'Produto Teste 2',
  description: 'Desc 2',
  price: 50,
  image: 'img2.jpg',
  tags: []
};


describe('Hook: useCart', () => {

  test('deve iniciar com o carrinho vazio e o modal fechado', () => {
    // Atuar: Renderiza o hook
    const { result } = renderHook(() => useCart());

    // Afirmar: Verifica o estado inicial
    expect(result.current.cartItems).toEqual([]);
    expect(result.current.isCartOpen).toBe(false);
    expect(result.current.cartTotal).toBe(0);
  });

  test('deve adicionar um novo produto ao carrinho', () => {
    const { result } = renderHook(() => useCart());

    // Atuar: Chama a função addToCart (dentro de act)
    act(() => {
      result.current.addToCart(mockProduct1);
    });

    // Afirmar: Verifica se o item foi adicionado e o total atualizado
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].name).toBe('Produto Teste 1');
    expect(result.current.cartItems[0].quantity).toBe(1);
    expect(result.current.cartTotal).toBe(100);
  });

  test('deve incrementar a quantidade de um produto existente', () => {
    const { result } = renderHook(() => useCart());

    // Atuar: Adiciona o mesmo produto duas vezes
    act(() => {
      result.current.addToCart(mockProduct1);
    });
    act(() => {
      result.current.addToCart(mockProduct1);
    });

    // Afirmar: Verifica se a quantidade foi incrementada
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
    expect(result.current.cartTotal).toBe(200);
  });

  test('deve remover um produto do carrinho', () => {
    const { result } = renderHook(() => useCart());

    // Organizar: Adiciona dois produtos
    act(() => {
      result.current.addToCart(mockProduct1);
      result.current.addToCart(mockProduct2);
    });

    // Atuar: Remove o primeiro produto
    act(() => {
      result.current.removeFromCart(1); // ID do mockProduct1
    });

    // Afirmar: Verifica se apenas o segundo produto permaneceu
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].id).toBe(2);
    expect(result.current.cartTotal).toBe(50);
  });

  test('deve atualizar a quantidade de um produto', () => {
    const { result } = renderHook(() => useCart());

    // Organizar: Adiciona um produto
    act(() => {
      result.current.addToCart(mockProduct1);
    });

    // Atuar: Atualiza a quantidade para 5
    act(() => {
      result.current.updateQuantity(1, 5); // ID do mockProduct1
    });

    // Afirmar: Verifica a nova quantidade e total
    expect(result.current.cartItems[0].quantity).toBe(5);
    expect(result.current.cartTotal).toBe(500);
  });
  
  test('deve remover o item se a quantidade for atualizada para 0 ou menos', () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct1);
    });

    act(() => {
      result.current.updateQuantity(1, 0); // Atualiza para 0
    });

    expect(result.current.cartItems).toHaveLength(0);
    expect(result.current.cartTotal).toBe(0);
  });

  test('deve abrir e fechar o modal do carrinho', () => {
    const { result } = renderHook(() => useCart());

    expect(result.current.isCartOpen).toBe(false); // Estado inicial

    // Atuar: Abre o modal
    act(() => {
      result.current.openCart();
    });
    expect(result.current.isCartOpen).toBe(true); // Verifica se abriu

    // Atuar: Fecha o modal
    act(() => {
      result.current.closeCart();
    });
    expect(result.current.isCartOpen).toBe(false); // Verifica se fechou
  });

});