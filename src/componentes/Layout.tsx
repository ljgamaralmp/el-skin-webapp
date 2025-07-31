import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

import { CartModal } from './CartModal'; 

function Layout() {
  return (
    <>
      <Header />      
      <CartModal />   
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;