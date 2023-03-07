import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import { AiFillRightCircle } from 'react-icons/ai';

const Home = () => {
  const [productsNew, setProductsNew] = useState([]);
  const [productsMostSold, setProductsMostSold] = useState([]);
  const [productsDisc, setProductsDisc] = useState([]);
  const [productsRecom, setProductsRecom] = useState([]);

  const queryLimit = 8;

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/products?Disc[gt]=0&limit=${queryLimit}`
    )
      .then((response) => response.json())
      .then((res) => setProductsDisc(res.data.products))
      .catch((err) => console.error(err.message));

    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/products?Flag=new&sort=-CreatedAt&limit=${queryLimit}`
    )
      .then((response) => response.json())
      .then((res) => setProductsNew(res.data.products))
      .catch((err) => console.error(err.message));

    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/products?Sold[gt]=5&sort=-Sold&limit=${queryLimit}`
    )
      .then((response) => response.json())
      .then((res) => setProductsMostSold(res.data.products))
      .catch((err) => console.error(err.message));

    fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/products?Flag=recommended&sort=-CreatedAt&limit=${queryLimit}`
    )
      .then((response) => response.json())
      .then((res) => setProductsRecom(res.data.products))
      .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {
    const handleContextmenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextmenu);
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
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
