import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

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
    <div>
      {products.map((product) => {
        const { idproduct } = product;
        return <ProductCard key={idproduct} product={product} />;
      })}
    </div>
  );
};

export default Home;
