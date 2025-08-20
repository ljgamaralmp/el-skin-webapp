// ProductCard.tsx

import styles from './ProductCard.module.css'; // Importe o CSS Module
import { Produto } from '../../types/types';

interface ProductCardProps {
  produto: Produto;
  onAddToCart: (produto: Produto) => void;
  onProductClick: (productId: string) => void;
}

function ProductCard({ produto, onAddToCart, onProductClick }: ProductCardProps) {

  // Função para lidar com o clique no botão, parando a propagação
  // para não acionar o clique do card inteiro.
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Impede que o onProductClick seja chamado
    onAddToCart(produto);
  };

  return (
    <div 
      className={styles.card} 
      data-testid="product-card" 
      onClick={() => onProductClick(String(produto.id))}
    >
      <img src={produto.image} alt={produto.name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title}>{produto.name}</h3>
        <p className={styles.description}>{produto.description}</p>
        <div className={styles.price}>
          <span>{produto.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
          <button 
            className={styles.button}
            data-testid="add-to-cart-button" 
            onClick={handleAddToCartClick}
          >
            Adicionar à sacola
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;