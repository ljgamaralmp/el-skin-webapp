import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Sobre from './pages/Sobre';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function AppRouter() {
  return (
    <main className='container'>
      <Router>
        
        <Header />     
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='sobre' element={<Sobre />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
    

      </Router>
    </main>
  );
}