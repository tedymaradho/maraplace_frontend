import { useState, useEffect } from 'react';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [productsNew, setProductsNew] = useState([]);
  const [productsMostSold, setProductsMostSold] = useState([]);
  const [productsDisc, setProductsDisc] = useState([]);
  const [productsRecom, setProductsRecom] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products?Disc[gt]=0&limit=6`)
      .then((response) => response.json())
      .then((res) => setProductsDisc(res.data.products))
      .catch((err) => console.error(err.message));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products?Flag=new&limit=6`)
      .then((response) => response.json())
      .then((res) => setProductsNew(res.data.products))
      .catch((err) => console.error(err.message));

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products?sort=-Sold&limit=6`)
      .then((response) => response.json())
      .then((res) => setProductsMostSold(res.data.products))
      .catch((err) => console.error(err.message));

    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/products?Flag=recommended&limit=6`
    )
      .then((response) => response.json())
      .then((res) => setProductsRecom(res.data.products))
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="home">
      <div className="home__header">
        <Header />
      </div>
      <div className="home__product">
        {productsDisc.length > 0 && (
          <h1 className="home__product--title">Special Discount</h1>
        )}
        <div className="home__product--scroll">
          <div className="home__product--box">
            {productsDisc.map((product) => {
              const { IdProduct } = product;
              return <ProductGrid key={IdProduct} product={product} />;
            })}
          </div>
        </div>

        {productsNew.length > 0 && (
          <h1 className="home__product--title">New Arrivals</h1>
        )}
        <div className="home__product--scroll">
          <div className="home__product--box">
            {productsNew.map((product) => {
              const { IdProduct } = product;
              return <ProductGrid key={IdProduct} product={product} />;
            })}
          </div>
        </div>

        {productsMostSold.length > 0 && (
          <h1 className="home__product--title">The Most Sold</h1>
        )}
        <div className="home__product--scroll">
          <div className="home__product--box">
            {productsMostSold.map((product) => {
              const { IdProduct } = product;
              return <ProductGrid key={IdProduct} product={product} />;
            })}
          </div>
        </div>

        {productsRecom.length > 0 && (
          <h1 className="home__product--title">Recommendation For You</h1>
        )}
        <div className="home__product--scroll">
          <div className="home__product--box">
            {productsRecom.map((product) => {
              const { IdProduct } = product;
              return <ProductGrid key={IdProduct} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
