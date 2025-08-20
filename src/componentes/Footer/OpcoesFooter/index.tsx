// OpcoesFooter.tsx

import { Link } from 'react-router-dom';
import styles from './OpcoesFooter.module.css'; // Importe o CSS Module

const footerOpcoes = ['Sobre a AL SKIN', 'Loja AL SKIN', 'Atendimento', 'Blog AL SKIN'];
const opcoesConteudo = [
  ['quem somos', 'time AL SKIN', 'carreiras'],
  ['lojas fisicas', 'devolução'],
  ['oi@alskin.com.br', 'ajuda'],
  ['Minha pele', 'ingredientes']
];

export default function OpcoesFooter() {
  return (
    <div className={styles.container}>
      {footerOpcoes.map((titulo, index) => (
        <div key={titulo} className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>{titulo}</h3>
          <ul className={styles.linkList}>
            {opcoesConteudo[index].map((linkTexto) => (
              <li key={linkTexto} className={styles.linkItem}>
                <Link to={`/sobre`} className={styles.link}>
                  {linkTexto}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}