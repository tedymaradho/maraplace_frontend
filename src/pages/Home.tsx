import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/products`)
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
      <div className="home__product">
        <h1 className="home__product--title">Get Special Discount</h1>
        <div className="home__product--box">
          {products.map((product) => {
            const { idproduct } = product;
            return <ProductGrid key={idproduct} product={product} />;
          })}
        </div>
        <h1 className="home__product--title">New Arrivals</h1>
        <div className="home__product--box">
          {products.map((product) => {
            const { idproduct } = product;
            return <ProductGrid key={idproduct} product={product} />;
          })}
        </div>
        <h1 className="home__product--title">The Most Sold</h1>
        <div className="home__product--box">
          {products.map((product) => {
            const { idproduct } = product;
            return <ProductGrid key={idproduct} product={product} />;
          })}
        </div>
        <h1 className="home__product--title">Recommendation For You</h1>
        <div className="home__product--box">
          {products.map((product) => {
            const { idproduct } = product;
            return <ProductGrid key={idproduct} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
