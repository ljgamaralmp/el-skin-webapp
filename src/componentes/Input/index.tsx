// Input.tsx

import styles from './Input.module.css'; // 1. Importe o CSS Module

interface InputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({ value, onChange }: InputProps) {
    return (
        // 2. Remova a div extra que não era necessária
        <input
            className={styles.inputContainer} // 3. Aplique a classe
            type="text"
            placeholder="Pesquisar produtos, marcas ou categorias"
            value={value}
            onChange={onChange}
        />
    );
}

export default Input;