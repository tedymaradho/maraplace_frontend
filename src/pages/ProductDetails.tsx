import { useEffect, useState, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../redux/cartSlice';

interface IProduct {
  id_product: string;
  product_name: string;
  merk: string;
  size: string;
  desc: string;
  category: string;
  price: number;
  disc: number;
  sale_price: number;
  stock: number;
  image_url: string[];
  sold: number;
  flag: string;
}

const INITIAL_PRODUCT = {
  id_product: '',
  product_name: '',
  merk: '',
  size: '',
  desc: '',
  category: '',
  price: 0,
  disc: 0,
  sale_price: 0,
  stock: 0,
  image_url: [],
  sold: 0,
  flag: '',
};

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState<IProduct>(INITIAL_PRODUCT);
  const [imageIndex, setImageIndex] = useState(0);
  const [qtyState, setQtyState] = useState(1);
  const dispatch = useDispatch();
  const { products, quantity, total } = useSelector((state: any) => state.cart);
  const { email } = useSelector((state: any) => state.currentUser);

  const navigate = useNavigate();

  const {
    id_product,
    product_name,
    merk,
    size,
    desc,
    category,
    price,
    disc,
    sale_price,
    stock,
    image_url,
    sold,
    flag,
  } = product;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resProduct = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?id_product=${
            params.idproduct
          }`
        );
        resProduct.data.status =
          'success' && setProduct(resProduct.data.data.products[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  const addToCartHandler = async () => {
    if (email) {
      const findItem = products.filter(
        ({ id_product }: any) => id_product === params.idproduct
      );

      if (findItem.length > 0) {
        const { _id, qty, sale_price } = findItem[0];
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/${_id}`,
          {
            qty: qty + qtyState,
            sub_total: sale_price * (qty + qtyState),
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
          email: email,
          id_product,
          image_url: image_url[0],
          product_name,
          price,
          disc,
          qty: qtyState,
          sale_price,
          sub_total: sale_price * qtyState,
        });
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${email}`
      );

      if (res.data.status === 'success') {
        dispatch(addToCart(res.data.data[0]));
      }
    } else {
      navigate('/login');
    }
  };

  const buyDirectlyHandler = async () => {
    addToCartHandler();
    navigate('/checkout');
  };

  return (
    <div className="details-product">
      <h1>
        <div className="details-product__box" key={id_product}>
          <div className="details-product--left">
            <img
              className="details-product__img"
              src={image_url[imageIndex]}
              alt={`Image of ${product_name}`}
            />
            <div className="details-product__img--slider-box">
              {image_url &&
                [...image_url].map((ImgUrl, idx) => {
                  return (
                    <button
                      className="details-product__img--link"
                      key={idx}
                      onClick={() => setImageIndex(idx)}
                    >
                      <img
                        className="details-product__img--slider"
                        src={ImgUrl}
                        alt={`Image of ${product_name}`}
                      />
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="details-product--right">
            <h1 className="heading heading__secondary details-product--title">
              {product_name}
            </h1>
            {disc > 0 ? (
              <>
                <div className="details-product__disc--box">
                  <p className="details-product--price-before">
                    Rp.&nbsp;{Intl.NumberFormat('en-US').format(price)}
                  </p>
                  <p className="details-product--disc">{disc}% off</p>
                </div>
                <p className="heading heading__primary">
                  Rp.&nbsp;
                  {Intl.NumberFormat('en-US').format(sale_price)}
                </p>
              </>
            ) : (
              <p className="heading heading__primary">
                Rp.&nbsp;
                {Intl.NumberFormat('en-US').format(price)}
              </p>
            )}
            <p className="details-product--item">Merk: {merk}</p>
            <p className="details-product--item">Size: {size}</p>
            <p className="details-product--item">Category: {category}</p>
            <p className="details-product--item">Flag: {flag}</p>
            <p className="details-product--item">Sold: {sold}</p>
            <p className="details-product--item">Stock: {stock}</p>
            <div className="details-product__cta">
              <label className="details-product__qty--label">
                Quantity&ensp;
                <div className="details-product__qty">
                  <AiFillMinusSquare
                    onClick={() => qtyState > 1 && setQtyState(qtyState - 1)}
                    className="details-product__qty--decrease"
                  />
                  <input
                    type="text"
                    className="details-product__qty--input"
                    value={qtyState}
                    onChange={(e) =>
                      +e.target.value > 0 && +e.target.value <= stock
                        ? setQtyState(+e.target.value)
                        : qtyState
                    }
                  />
                  <AiFillPlusSquare
                    onClick={() =>
                      qtyState < stock && setQtyState(qtyState + 1)
                    }
                    className="details-product__qty--increase"
                  />
                </div>
              </label>
              <div className="details-product__btn--box">
                <button
                  onClick={addToCartHandler}
                  className="btn btn--primary btn--lg"
                >
                  Add to cart
                </button>
                <button
                  onClick={buyDirectlyHandler}
                  className="btn btn--secondary btn--lg"
                >
                  Buy directly
                </button>
              </div>
            </div>
            <p className="details-product--desc">
              {`${desc}`.replaceAll('\\n', '\n')}
            </p>
          </div>
        </div>
      </h1>
    </div>
  );
};

export default ProductDetails;
