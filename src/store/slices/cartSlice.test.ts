import cartReducer, { addToCart, CartState, clearCart, CartItem, removeFromCart, updateQuantity } from './cartSlice';
 
const estadoAnterior: CartState = {
  cartItems: [],
  isCartOpen: false,
};
 
const mockItem: Omit<CartItem, 'quantity'> = {
  id: 1,
  name: 'Produto Teste',
  price: 99.99,
  image: '/test.jpg',
  description: 'Descrição do produto teste',
  tags: [{ label: 'protection', type: 'protection' }]
};
 
const mockItemCarrinho: CartItem = {
  ...mockItem,
  quantity: 1,
};
 
describe('cartSlice', () => {
  
  it('deve retornar o estado inicial', () => {
    const expectedInitialState = {
      cartItems: [],
      isCartOpen: false,
    };

    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(expectedInitialState);
  });

 
  it('deve adicionar um novo item ao carrinho', () => {
    const novoEstado = cartReducer(estadoAnterior, addToCart({ id: 1, name: 'Item 1', price: 100, image: '' , description: '', tags: [] }));
    expect(novoEstado.cartItems.length).toBe(1);
    expect(novoEstado.cartItems[0].id).toBe(1);
    expect(novoEstado.cartItems[0].quantity).toBe(1);
  });
 
  it('deve incrementar à quantidade se o item já existe no carrinho', () => {
    let novoEstado = cartReducer(estadoAnterior, addToCart({
      id: 1, name: 'Item 1', price: 100, image: '',
      description: '',
      tags: []
    }));
    novoEstado = cartReducer(novoEstado, addToCart({
      id: 1, name: 'Item 1', price: 100, image: '',
      description: '',
      tags: []
    }));
    expect(novoEstado.cartItems.length).toBe(1);
    expect(novoEstado.cartItems[0].id).toBe(1);
    expect(novoEstado.cartItems[0].quantity).toBe(2);
  });
 
  it('deve incrementar à quantidade se o item já existe no carrinho', () => {
    let novoEstado = cartReducer(estadoAnterior, addToCart({
      id: 1, name: 'Item 1', price: 100, image: '',
      description: '',
      tags: []
    }));
    novoEstado = cartReducer(novoEstado, addToCart({
      id: 2, name: 'Item 2', price: 100, image: '',
      description: '',
      tags: []
    }));
    expect(novoEstado.cartItems.length).toBe(2);
    expect(novoEstado.cartItems[0].id).toBe(1);
    expect(novoEstado.cartItems[0].quantity).toBe(1);
    expect(novoEstado.cartItems[1].quantity).toBe(1);
  });
 
  it('deve remover item do carrinho', () => {
    const previousState = {
      cartItems: [mockItemCarrinho],
      isCartOpen: true,
    };

    const actual = cartReducer(previousState, removeFromCart(1));
    expect(actual.cartItems).toHaveLength(0);
  });
 
  it('não deve fazer nada se item não existir', () => {
    const previousState = {
      cartItems: [mockItemCarrinho],
      isCartOpen: true,
    };

    const actual = cartReducer(previousState, removeFromCart(2));
    expect(actual.cartItems).toHaveLength(1);
    expect(actual.cartItems[0]).toEqual(mockItemCarrinho);
  });
 
  it('deve atualizar quantidade do item', () => {
    const previousState = {
      cartItems: [mockItemCarrinho],
      isCartOpen: true,
    };

    const actual = cartReducer(previousState, updateQuantity({ productId: 1, quantity: 3 }));
    expect(actual.cartItems[0].quantity).toBe(3);
  });
 
  it('deve remover item quando quantidade for 0', () => {
    const previousState = {
      cartItems: [mockItemCarrinho],
      isCartOpen: true,
    };

    const actual = cartReducer(previousState, updateQuantity({ productId: 1, quantity: 0 }));
    expect(actual.cartItems).toHaveLength(0);
  });
 
  it('não deve fazer nada se item não existir', () => {
    const previousState = {
      cartItems: [mockItemCarrinho],
      isCartOpen: true,
    };

    const actual = cartReducer(previousState, updateQuantity({ productId: 2, quantity: 5 }));
    expect(actual.cartItems).toHaveLength(1);
    expect(actual.cartItems[0]).toEqual(mockItemCarrinho);
  });
 
  describe('clearCart', () => {
    it('deve limpar todos os itens do carrinho', () => {
      const previousState = {
        cartItems: [
          mockItemCarrinho,
          { ...mockItemCarrinho, id: 2, name: 'Produto 2' },
        ],
        isCartOpen: true,
      };
 
      const actual = cartReducer(previousState, clearCart());
      expect(actual.cartItems).toHaveLength(0);
    });
 
    it('deve manter estado vazio se carrinho já estiver vazio', () => {
      const actual = cartReducer(estadoAnterior, clearCart());
      expect(actual.cartItems).toHaveLength(0);
    });
 
    it('deve lidar com múltiplas operações sequenciais', () => {
      // Adicionar primeiro item
      let state = cartReducer(estadoAnterior, addToCart(mockItem));
      expect(state.cartItems).toHaveLength(1);

      // Adicionar segundo item
      const secondItem = { ...mockItem, id: 2, name: 'Produto 2' };
      state = cartReducer(state, addToCart(secondItem));
      expect(state.cartItems).toHaveLength(2);

      // Atualizar quantidade do primeiro item
      state = cartReducer(state, updateQuantity({ productId: 1, quantity: 3 }));
      expect(state.cartItems[0].quantity).toBe(3);

      // Remover segundo item
      state = cartReducer(state, removeFromCart(2));
      expect(state.cartItems).toHaveLength(1);
      expect(state.cartItems[0].id).toBe(1);

      // Limpar carrinho
      state = cartReducer(state, clearCart());
      expect(state.cartItems).toHaveLength(0);
    });
  });
});