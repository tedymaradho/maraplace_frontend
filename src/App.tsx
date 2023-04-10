import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductCategory from './pages/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Chekout';
import ProductAdd from './pages/ProductAdd';
import Setting from './pages/Setting';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProductEdit from './pages/ProductEdit';

import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path=":category" element={<ProductCategory />} />
          <Route path=":category/:idproduct" element={<ProductDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product/add" element={<ProductAdd />} />
          <Route path="product/edit/:idproduct" element={<ProductEdit />} />
          <Route path="settings" element={<Setting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
