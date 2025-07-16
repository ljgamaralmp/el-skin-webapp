import { SearchProvider } from './contexts/SearchContext';
import Home from './pages/Home'; 
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
        <AppRouter />
      </SearchProvider>
      
    </>
  );
}

export default App;