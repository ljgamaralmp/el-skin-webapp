"use client";

import Image from 'next/image';
import Pesquisa from '../../Pesquisa';
import sacolaIcon from '../../../assets/sacola.png';
import styles from './Topo.module.css'; // Importe o CSS Module

import { useSelector, useDispatch } from 'react-redux';
import { openCart, selectCartItemCount } from '../../../store/slices/cartSlice';

export default function Topo() {
  const dispatch = useDispatch();
  const totalItems = useSelector(selectCartItemCount);

  const handleOpenCart = () => {
    dispatch(openCart());
  };

  return (
    <div className={styles.topoContainer}>
      <p className={styles.logo}>AL SKIN</p>
      <Pesquisa />
      
      <button onClick={handleOpenCart} className={styles.cartButton}>
       <Image 
    src={sacolaIcon} 
    alt="Ícone de Sacola" 
    width={48} // 3rem * 16px/rem = 48
    height={48} // 3rem * 16px/rem = 48
  />
        {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
      </button>
    </div>
  );
}