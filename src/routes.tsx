import Layout from './componentes/Layout'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Sobre from './pages/Sobre';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function AppRouter() {
  return (
    <main className='container'>
      <Router>    
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='sobre' element={<Sobre />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}