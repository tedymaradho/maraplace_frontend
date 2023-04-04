import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillRightCircle } from 'react-icons/ai';
import axios from 'axios';

import ProductGrid from '../components/ProductGrid';
import Header from '../components/Header';

const Home = () => {
  const [productsNew, setProductsNew] = useState([]);
  const [productsMostSold, setProductsMostSold] = useState([]);
  const [productsDisc, setProductsDisc] = useState([]);
  const [productsRecom, setProductsRecom] = useState([]);

  const queryLimit = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resDisc = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?disc[gt]=0&limit=${queryLimit}`
        );

        resDisc.data.results > 0 && setProductsDisc(resDisc.data.data.products);

        const resNew = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?flag=new&sort=-created_at&limit=${queryLimit}`
        );

        resNew.data.results > 0 && setProductsNew(resNew.data.data.products);

        const resSold = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?sold[gt]=5&sort=-sold&limit=${queryLimit}`
        );

        resSold.data.results > 0 &&
          setProductsMostSold(resSold.data.data.products);

        const resRecom = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?flag=recommended&sort=-created_at&limit=${queryLimit}`
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
                const { id_product } = product;
                return <ProductGrid key={id_product} product={product} />;
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
                const { id_product } = product;
                return <ProductGrid key={id_product} product={product} />;
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
                const { id_product } = product;
                return <ProductGrid key={id_product} product={product} />;
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
                const { id_product } = product;
                return <ProductGrid key={id_product} product={product} />;
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
