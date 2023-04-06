import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart } from '../redux/cartSlice';

interface IProps {
  product: {
    id_product: string;
    images: string[];
    product_name: string;
    price: number;
    disc: number;
    sale_price: number;
    category: string;
  };
}

const ProductGrid: FC<IProps> = (props) => {
  const { email } = useSelector((state: any) => state.currentUser);
  const { products } = useSelector((state: any) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    id_product,
    images,
    product_name,
    price,
    disc,
    sale_price,
    category,
  } = props.product;
  const priceFormat = new Intl.NumberFormat('en-US').format(price);
  const salePriceFormat = new Intl.NumberFormat('en-US').format(sale_price);

  const addToCartHandler = async () => {
    if (email) {
      try {
        const resFind = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/cart?email=${email}&id_product=${id_product}`
        );

        if (resFind.data.data.cartItems.length > 0) {
          await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart/${
              resFind.data.data.cartItems[0]._id
            }`,
            {
              qty: resFind.data.data.cartItems[0].qty + 1,
              sub_total:
                resFind.data.data.cartItems[0].sale_price *
                (resFind.data.data.cartItems[0].qty + 1),
            }
          );
        } else {
          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            email: email,
            id_product,
            images: images[0],
            product_name,
            price,
            disc,
            qty: 1,
            sale_price,
            sub_total: sale_price,
          });
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${email}`
        );

        if (res.data.data.length > 0) {
          dispatch(
            addToCart({
              ...products,
              quantity: res.data.data[0].sumQty,
              total: res.data.data[0].sumSubTotal,
            })
          );
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="product-grid">
      <Link
        to={`/${category}/${id_product}`}
        className="product-grid__img--box"
      >
        <img
          src={images[0]}
          alt={`Image of ${product_name}`}
          className="product-grid__img"
        />
      </Link>

      <div className="product-grid__item--box">
        <div>
          <Link
            to={`/${category}/${id_product}`}
            className="product-grid__title"
          >
            {product_name}
          </Link>

          {disc > 0 && (
            <div className="product-grid__disc--box">
              <p className="product-grid__price-before">Rp. {priceFormat}</p>
              <p className="product-grid__disc">{disc}% off</p>
            </div>
          )}
          <p className="product-grid__price">Rp. {salePriceFormat}</p>
        </div>

        <button onClick={addToCartHandler} className="btn btn--invert btn--sm">
          <FaShoppingCart className="product-grid__icon--shop" /> Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
