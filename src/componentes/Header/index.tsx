

import OpcoesHeader from './OpcoesHeader';
import Topo from './Topo';
import styles from './Header.module.css'; // 1. Importe o CSS Module

// 2. Remova toda a lógica do styled-components

function Header() {
    return (
        // 3. Aplique a classe do CSS Module ao elemento <header>
        <header className={styles.headerContainer}>
            <Topo />
            <OpcoesHeader />
        </header>
    );
}

export default Header;