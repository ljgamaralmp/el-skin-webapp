import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import AppRouter from './routes';
import { store } from './store';
import { GlobalStyle } from './styles/GlobalStyle';
import { tema } from './styles/tema';
 
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={tema}>
        <GlobalStyle />
          <AppRouter />
      </ThemeProvider>
    </Provider>
  );
}
 
export default App;