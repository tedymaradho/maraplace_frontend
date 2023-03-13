import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import CategoryProduct from './pages/CategoryProduct';
import './sass/main.scss';
import DetailsProduct from './pages/DetailsProduct';
import Checkout from './pages/Chekout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path=":category" element={<CategoryProduct />} />
          <Route path=":category/:idproduct" element={<DetailsProduct />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
