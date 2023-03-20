import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import CategoryProduct from './pages/CategoryProduct';
import DetailsProduct from './pages/DetailsProduct';
import Checkout from './pages/Chekout';
import AddProduct from './pages/AddProduct';
import Setting from './pages/Setting';
import ProductList from './pages/ProductList';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
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
