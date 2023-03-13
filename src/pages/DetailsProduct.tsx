import { useEffect, useState, FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiFillPlusSquare, AiFillMinusSquare } from 'react-icons/ai';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartItemsAtom,
  currentUserAtom,
  sumQtyAtom,
  sumSubTotalAtom,
} from '../recoils';

interface IProduct {
  IdProduct: string;
  ProductName: string;
  Merk: string;
  Size: string;
  Desc: string;
  Category: string;
  Price: number;
  Disc: number;
  SalePrice: number;
  Stock: number;
  ImageUrl: string[];
  Sold: number;
  Flag: string;
}

const INITIAL_PRODUCT = {
  IdProduct: '',
  ProductName: '',
  Merk: '',
  Size: '',
  Desc: '',
  Category: '',
  Price: 0,
  Disc: 0,
  SalePrice: 0,
  Stock: 0,
  ImageUrl: [],
  Sold: 0,
  Flag: '',
};

const DetailsProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState<IProduct>(INITIAL_PRODUCT);
  const [imageIndex, setImageIndex] = useState(0);
  const [qtyState, setQtyState] = useState(1);
  const cartItems = useRecoilValue(cartItemsAtom);
  const { curUserId } = useRecoilValue(currentUserAtom);
  const setSumQty = useSetRecoilState(sumQtyAtom);
  const setSumSubTotal = useSetRecoilState(sumSubTotalAtom);

  const navigate = useNavigate();

  const {
    IdProduct,
    ProductName,
    Merk,
    Size,
    Desc,
    Category,
    Price,
    Disc,
    SalePrice,
    Stock,
    ImageUrl,
    Sold,
    Flag,
  } = product;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resProduct = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?IdProduct=${
            params.idproduct
          }`
        );
        resProduct.data.results > 0 &&
          setProduct(resProduct.data.data.products[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, []);

  const addToCartHandler = async () => {
    if (curUserId) {
      const findItem = cartItems.filter(
        ({ IdProduct }) => IdProduct === params.idproduct
      );

      if (findItem.length > 0) {
        const { _id, Qty, SalePrice } = findItem[0];
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/${_id}`,
          {
            Qty: Qty + qtyState,
            SubTotal: SalePrice * (Qty + qtyState),
          }
        );
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
          IdUser: curUserId,
          IdProduct,
          ImageUrl: ImageUrl[0],
          ProductName,
          Price,
          Disc,
          Qty: qtyState,
          SalePrice,
          SubTotal: SalePrice * qtyState,
        });
      }

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${curUserId}`
      );

      if (res.data.data.length > 0) {
        setSumQty(res.data.data[0].sumQty);
        setSumSubTotal(res.data.data[0].sumSubTotal);
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
            <h1 className="heading heading__secondary details-product--title">
              {ProductName}
            </h1>
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
                  {Intl.NumberFormat('en-US').format(SalePrice)}
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
                    onClick={() => qtyState > 1 && setQtyState(qtyState - 1)}
                    className="details-product__qty--decrease"
                  />
                  <input
                    type="text"
                    className="details-product__qty--input"
                    value={qtyState}
                    onChange={(e) =>
                      +e.target.value > 0 && +e.target.value <= Stock
                        ? setQtyState(+e.target.value)
                        : qtyState
                    }
                  />
                  <AiFillPlusSquare
                    onClick={() =>
                      qtyState < Stock && setQtyState(qtyState + 1)
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
              {`${Desc}`.replaceAll('\\n', '\n')}
            </p>
          </div>
        </div>
      </h1>
    </div>
  );
};

export default DetailsProduct;
