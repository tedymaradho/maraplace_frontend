import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../layouts/Header';
import ProductGrid from '../components/ProductGrid';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';

const Home = () => {
  const [productsNew, setProductsNew] = useState([]);
  const [productsMostSold, setProductsMostSold] = useState([]);
  const [productsDisc, setProductsDisc] = useState([]);
  const [productsRecom, setProductsRecom] = useState([]);

  const queryLimit = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDisc = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?Disc[gt]=0&limit=${queryLimit}`
        );

        resDisc.data.results > 0 && setProductsDisc(resDisc.data.data.products);

        const resNew = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?Flag=new&sort=-CreatedAt&limit=${queryLimit}`
        );

        resNew.data.results > 0 && setProductsNew(resNew.data.data.products);

        const resSold = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?Sold[gt]=5&sort=-Sold&limit=${queryLimit}`
        );

        resSold.data.results > 0 &&
          setProductsMostSold(resSold.data.data.products);

        const resRecom = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?Flag=recommended&sort=-CreatedAt&limit=${queryLimit}`
        );

        resRecom.data.results > 0 &&
          setProductsRecom(resRecom.data.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
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
        {productsDisc.length >= queryLimit && (
          <Link to="special-discount" className="home__see--all">
            | See all
          </Link>
        )}
        <div className="home__product--scroll">
          <div className="home__product--box">
            {productsDisc &&
              productsDisc.map((product) => {
                const { IdProduct } = product;
                return <ProductGrid key={IdProduct} product={product} />;
              })}
            {productsDisc.length >= queryLimit && (
              <Link to="special-discount" className="home__see--all">
                <AiFillRightCircle className="home__btn--see-all" />
                <p>See more</p>
              </Link>
            )}
          </div>
        </div>

        {productsNew.length > 0 && (
          <h1 className="home__product--title">New Arrivals</h1>
        )}
        {productsNew.length >= queryLimit && (
          <Link to="new-arrivals" className="home__see--all">
            | See all
          </Link>
        )}
        <div className="home__product--scroll">
          <div className="home__product--box">
            {productsNew &&
              productsNew.map((product) => {
                const { IdProduct } = product;
                return <ProductGrid key={IdProduct} product={product} />;
              })}
            {productsNew.length >= queryLimit && (
              <Link to="new-arrivals" className="home__see--all">
                <AiFillRightCircle className="home__btn--see-all" />
                <p>See more</p>
              </Link>
            )}
          </div>
        </div>

        {productsMostSold.length > 0 && (
          <h1 className="home__product--title">The Most Sold</h1>
        )}
        {productsMostSold.length >= queryLimit && (
          <Link to="most-sold" className="home__see--all">
            | See all
          </Link>
        )}
        <div className="home__product--scroll">
          <div className="home__product--box">
            {productsMostSold &&
              productsMostSold.map((product) => {
                const { IdProduct } = product;
                return <ProductGrid key={IdProduct} product={product} />;
              })}
            {productsMostSold.length >= queryLimit && (
              <Link to="most-sold" className="home__see--all">
                <AiFillRightCircle className="home__btn--see-all" />
                <p>See more</p>
              </Link>
            )}
          </div>
        </div>

        {productsRecom.length > 0 && (
          <h1 className="home__product--title">Recommendation For You</h1>
        )}
        {productsRecom.length >= queryLimit && (
          <Link to="recommendation" className="home__see--all">
            | See all
          </Link>
        )}
        <div className="home__product--scroll">
          <div className="home__product--box">
            {productsRecom &&
              productsRecom.map((product) => {
                const { IdProduct } = product;
                return <ProductGrid key={IdProduct} product={product} />;
              })}
            {productsRecom.length >= queryLimit && (
              <Link to="recommendation" className="home__see--all">
                <AiFillRightCircle className="home__btn--see-all" />
                <p>See more</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
