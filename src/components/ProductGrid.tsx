import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { currentUserAtom, sumQtyAtom, sumSubTotalAtom } from '../recoils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';

interface IProps {
  product: {
    IdProduct: string;
    ImageUrl: string[];
    ProductName: string;
    Price: number;
    Disc: number;
    SalePrice: number;
    Category: string;
  };
}

const ProductGrid: FC<IProps> = (props) => {
  const { curUserId } = useRecoilValue(currentUserAtom);
  const setSumQty = useSetRecoilState(sumQtyAtom);
  const setSumSubTotal = useSetRecoilState(sumSubTotalAtom);
  const navigate = useNavigate();

  const { IdProduct, ImageUrl, ProductName, Price, Disc, SalePrice, Category } =
    props.product;
  const priceFormat = new Intl.NumberFormat('en-US').format(Price);
  const salePriceFormat = new Intl.NumberFormat('en-US').format(SalePrice);

  const addToCartHandler = async () => {
    if (curUserId) {
      try {
        const resFind = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/cart?IdUser=${curUserId}&IdProduct=${IdProduct}`
        );

        if (resFind.data.data.cartItems.length > 0) {
          await axios.patch(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart/${
              resFind.data.data.cartItems[0]._id
            }`,
            {
              Qty: resFind.data.data.cartItems[0].Qty + 1,
              SubTotal:
                resFind.data.data.cartItems[0].SalePrice *
                (resFind.data.data.cartItems[0].Qty + 1),
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
            Qty: 1,
            SalePrice,
            SubTotal: SalePrice,
          });
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${curUserId}`
        );

        if (res.data.data.length > 0) {
          setSumQty(res.data.data[0].sumQty);
          setSumSubTotal(res.data.data[0].sumSubTotal);
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
      <Link to={`/${Category}/${IdProduct}`} className="product-grid__img--box">
        <img
          src={ImageUrl[0]}
          alt={`Image of ${ProductName}`}
          className="product-grid__img"
        />
      </Link>

      <div className="product-grid__item--box">
        <div>
          <Link
            to={`/${Category}/${IdProduct}`}
            className="product-grid__title"
          >
            {ProductName}
          </Link>

          {Disc > 0 && (
            <div className="product-grid__disc--box">
              <p className="product-grid__price-before">Rp. {priceFormat}</p>
              <p className="product-grid__disc">{Disc}% off</p>
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
