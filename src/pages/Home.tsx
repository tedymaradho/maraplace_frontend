import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductCart from '../components/ProductCart';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        fetch('http://127.0.0.1:3001/api/products')
          .then((response) => response.json())
          .then((res) => setProducts(res.data.products));
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="home">
      <div className="home__header">
        <Header />
      </div>
      <div className="home__product-cart">
        {products.map((product) => {
          const { idproduct } = product;
          return <ProductCart key={idproduct} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Home;
