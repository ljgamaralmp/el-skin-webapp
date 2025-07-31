import { SearchProvider } from './contexts/SearchContext';
import { CartProvider } from './contexts/CartContext';
import { tema } from './styles/tema';
import { ThemeProvider } from 'styled-components';
import AppRouter from './routes';
import { GlobalStyle } from './styles/GlobalStyle';

function App() {
  return (
      <ThemeProvider theme={tema}>
        <GlobalStyle />
        <SearchProvider>
        <CartProvider>
         <AppRouter />
        </CartProvider>
       </SearchProvider>
      </ThemeProvider>
  );
}

export default App;