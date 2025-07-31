import 'normalize.css';
import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext';
import { createGlobalStyle } from 'styled-components';
import AppRouter from './routes';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <SearchProvider>
      <CartProvider>
         <AppRouter />
      </CartProvider>
      </SearchProvider>
      
    </>
  );
}

export default App;