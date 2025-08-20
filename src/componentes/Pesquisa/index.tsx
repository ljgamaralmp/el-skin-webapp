// Pesquisa.tsx
import Image from 'next/image';
import Input from '../Input';
import lupa from '../../assets/lupa.svg';
import styles from './Pesquisa.module.css'; // Importe o CSS Module
import { useSearch } from '../../hooks/useSearch';

export default function Pesquisa() {
    const { search, setSearch } = useSearch();

    return (
        <div className={styles.pesquisaContainer}>
            <Input 
                value={search} 
                onChange={(evento) => setSearch(evento.target.value)}
            />
        </div>
    );
}