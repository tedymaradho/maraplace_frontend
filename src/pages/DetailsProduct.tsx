import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import axios from 'axios';

const DetailsProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products?IdProduct=${
          params.idproduct
        }`
      )
      .then((res) => setProduct(res.data.data.products))
      .catch((err) => console.error(err));
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
              ProductName,
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
                    alt={`Image of ${ProductName}`}
                  />
                  <div className="details-product__img--slider-box">
                    {ImageUrl &&
                      [...ImageUrl].map((ImgUrl, idx) => {
                        return (
                          <button
                            className="details-product__img--link"
                            key={idx}
                            onClick={() => setImageIndex(idx)}
                          >
                            <img
                              className="details-product__img--slider"
                              src={ImgUrl}
                              alt={`Image of ${ProductName}`}
                            />
                          </button>
                        );
                      })}
                  </div>
                </div>
                <div className="details-product--right">
                  <h1 className="heading heading__secondary">{ProductName}</h1>
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
                    <label className="details-product__qty--label">
                      Quantity&ensp;
                      <div className="details-product__qty">
                        <AiFillMinusSquare
                          onClick={() => qty > 1 && setQty(qty - 1)}
                          className="details-product__qty--decrease"
                        />
                        <input
                          type="text"
                          className="details-product__qty--input"
                          value={qty}
                          onChange={(e) =>
                            +e.target.value > 0 && +e.target.value <= Stock
                              ? setQty(+e.target.value)
                              : qty
                          }
                        />
                        <AiFillPlusSquare
                          onClick={() => qty < Stock && setQty(qty + 1)}
                          className="details-product__qty--increase"
                        />
                      </div>
                    </label>
                    <div className="details-product__btn--box">
                      <button className="btn btn--primary btn--lg">
                        Add to cart
                      </button>
                      <button className="btn btn--secondary btn--lg">
                        Buy directly
                      </button>
                    </div>
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
