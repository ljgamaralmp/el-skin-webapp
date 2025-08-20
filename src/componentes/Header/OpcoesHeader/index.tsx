// OpcoesHeader.tsx

import styles from './OpcoesHeader.module.css'; // Importe o CSS Module

const headerOpcoes = ['Categorias', 'Tipos de pele', 'Necessidade', 'Ingredientes'];

function OpcoesHeader() {
    return (
        <div className={styles.container}>
            <ul className={styles.opcoes}>
                {headerOpcoes.map((option, index) => (
                    <li key={index} className={styles.opcao}>
                        <p>{option}</p>
                    </li>
                ))}
            </ul> 
            <p className={styles.promocao}>Kits até 50% OFF</p>
        </div>
    );
}

export default OpcoesHeader;