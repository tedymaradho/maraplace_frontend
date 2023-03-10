import React from 'react';
import { Link } from 'react-router-dom';
import { currentUserAtom, cartCountAtom } from '../recoils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';

interface IProps {
  product: {
    IdProduct: string;
    ImageUrl: string[];
    ProductName: string;
    Price: number;
    Disc: number;
    PriceAfterDisc: number;
    Category: string;
  };
}

const ProductGrid: React.FC<IProps> = (props) => {
  const currentUser = useRecoilValue(currentUserAtom);
  const setCartCount = useSetRecoilState(cartCountAtom);
  const {
    IdProduct,
    ImageUrl,
    ProductName,
    Price,
    Disc,
    PriceAfterDisc,
    Category,
  } = props.product;
  const priceFormat = new Intl.NumberFormat('en-US').format(Price);
  const priceDiscFormat = new Intl.NumberFormat('en-US').format(PriceAfterDisc);

  const addToCartHandler = async () => {
    if (currentUser) {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
          IdUser: currentUser,
          IdProduct,
          ImageUrl: ImageUrl[0],
          ProductName,
          Quantity: 1,
        });

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${currentUser}`
        );

        setCartCount(res.data.data[0].sumQty);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="product-grid">
      <Link to={`/${Category}/${IdProduct}`} className="product-grid__img--box">
        <img
          src={ImageUrl[0]}
          alt={`Image of ${ProductName}`}
          className="product-grid__img"
        />
      </Link>

      <div className="product-grid__item--box">
        <Link to={`/${Category}/${IdProduct}`} className="product-grid__title">
          {ProductName}
        </Link>
        {Disc > 0 ? (
          <div>
            <div className="product-grid__disc--box">
              <p className="product-grid__price-before">Rp. {priceFormat}</p>
              <p className="product-grid__disc">{Disc}% off</p>
            </div>
            <p className="product-grid__price-disc">Rp. {priceDiscFormat}</p>
          </div>
        ) : (
          <p className="product-grid__price">Rp. {priceFormat}</p>
        )}
        <button onClick={addToCartHandler} className="btn btn--invert btn--sm">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
