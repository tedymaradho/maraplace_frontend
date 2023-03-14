import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import CategoryProduct from './pages/CategoryProduct';
import './styles/main.scss';
import DetailsProduct from './pages/DetailsProduct';
import Checkout from './pages/Chekout';
import AddProduct from './pages/AddProduct';
import Setting from './pages/Setting';
import ProductList from './pages/ProductList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path=":category" element={<CategoryProduct />} />
          <Route path=":category/:idproduct" element={<DetailsProduct />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product/list" element={<ProductList />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
