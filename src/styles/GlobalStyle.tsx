import 'normalize.css';
import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.cores.fundo.claro};
    color: ${({ theme }) => theme.cores.texto.primario};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: ${({ theme }) => theme.tamanhoFonte.base};
    margin: 0;
    padding: 0;
  }
`;