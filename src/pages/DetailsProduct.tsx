import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailsProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?IdProduct=${
        params.idproduct
      }`
    )
      .then((response) => response.json())
      .then((res) => setProduct(res.data.products))
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
    <div className="details-product">
      <h1>
        {product &&
          product.map((prod) => {
            const {
              IdProduct,
              ImageUrl,
              Name,
              Merk,
              Size,
              Category,
              Desc,
              Price,
              Disc,
              PriceAfterDisc,
              Stock,
              Sold,
              Flag,
            } = prod;
            return (
              <div className="details-product__box" key={IdProduct}>
                <div className="details-product--left">
                  <img
                    className="details-product__img"
                    src={ImageUrl[imageIndex]}
                    alt={`Image of ${Name}`}
                  />
                  <div className="details-product__img--slider-box">
                    {ImageUrl &&
                      [...ImageUrl].map((ImgUrl, idx) => {
                        return (
                          <a
                            href="#"
                            className="details-product__img--link"
                            key={idx}
                            onClick={() => setImageIndex(idx)}
                          >
                            <img
                              className="details-product__img--slider"
                              src={ImgUrl}
                              alt={`Image of ${Name}`}
                            />
                          </a>
                        );
                      })}
                  </div>
                </div>
                <div className="details-product--right">
                  <h1 className="heading heading__secondary">{Name}</h1>
                  {Disc > 0 ? (
                    <>
                      <div className="details-product__disc--box">
                        <p className="details-product--price-before">
                          Rp.&nbsp;{Intl.NumberFormat('en-US').format(Price)}
                        </p>
                        <p className="details-product--disc">{Disc}% off</p>
                      </div>
                      <p className="heading heading__primary">
                        Rp.&nbsp;
                        {Intl.NumberFormat('en-US').format(PriceAfterDisc)}
                      </p>
                    </>
                  ) : (
                    <p className="heading heading__primary">
                      Rp.&nbsp;
                      {Intl.NumberFormat('en-US').format(Price)}
                    </p>
                  )}
                  <p className="details-product--item">Merk: {Merk}</p>
                  <p className="details-product--item">Size: {Size}</p>
                  <p className="details-product--item">Category: {Category}</p>
                  <p className="details-product--item">Flag: {Flag}</p>
                  <p className="details-product--item">Sold: {Sold}</p>
                  <p className="details-product--item">Stock: {Stock}</p>
                  <div className="details-product__cta">
                    <label>
                      Quantity&ensp;
                      <input type="number" className="details-product__note" />
                    </label>
                    <button className="details-product__cta--cart">
                      Add to cart
                    </button>
                    <button className="details-product__cta--buy">
                      Buy directly
                    </button>
                  </div>
                  <p className="details-product--desc">
                    {`${Desc}`.replaceAll('\\n', '\n')}
                  </p>
                </div>
              </div>
            );
          })}
      </h1>
    </div>
  );
};

export default DetailsProduct;
