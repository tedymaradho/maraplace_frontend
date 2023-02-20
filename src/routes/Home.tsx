import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios('api/products');
        setProducts(res.data.data.products);
      } catch (err) {
        console.error(err);
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product) => {
        return <ProductCard product={product} />;
      })}
    </div>
  );
};

export default Home;
