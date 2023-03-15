import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartItemsAtom,
  currentUserAtom,
  sumQtyAtom,
  sumSubTotalAtom,
} from '../recoils';
import {
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineClose,
} from 'react-icons/ai';
import axios from 'axios';

const Checkout = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);
  const sumQty = useRecoilValue(sumQtyAtom);
  const sumSubTotal = useRecoilValue(sumSubTotalAtom);
  const { curUsername, curFullname, curAddress, curPhone } =
    useRecoilValue(currentUserAtom);
  const setSumQty = useSetRecoilState(sumQtyAtom);
  const setSumSubTotal = useSetRecoilState(sumSubTotalAtom);
  const [productCart, setProductCart] = useState<[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStock = async () => {
      let IdProd: [] = [];
      let IdProdString = '';

      cartItems.map(({ IdProduct }) => {
        IdProd.push(IdProduct);
      });

      if (IdProd.length > 0) {
        IdProdString = IdProd.toString().replaceAll(',', '&IdProduct=');
      }

      try {
        const resStock = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?IdProduct=${IdProdString}`
        );

        if (resStock.data.results > 0) {
          setProductCart(resStock.data.data.products);
        }
      } catch (error) {
        throw error;
      }
    };
    fetchStock();
  }, []);

  const patchToCart = async (id: object, qty: number, salePrice: number) => {
    if (curUsername) {
      try {
        const resStock = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/${id}`,
          {
            Qty: qty,
            SubTotal: salePrice * qty,
          }
        );

        if (resStock.data.data.cartItem.length > 0) {
          setCartItems(resStock.data.data.cartItem);
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${curUsername}`
        );

        if (res.data.data.length > 0) {
          setSumQty(res.data.data[0].sumQty);
          setSumSubTotal(res.data.data[0].sumSubTotal);
        } else {
          setSumQty(0);
          setSumSubTotal(0);
          navigate('/');
        }
      } catch (error) {
        throw error;
      }
    } else {
      navigate('/login');
    }
  };

  const qtyChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: Object,
    idproduct: string,
    SalePrice: number
  ) => {
    productCart.map(({ IdProduct, Stock }) => {
      if (IdProduct === idproduct) {
        if (Stock >= +e.target.value) {
          patchToCart(id, +e.target.value, SalePrice);
        }
      }
    });
  };

  const minusQtyHandler = (id: object, qty: number, salePrice: number) => {
    qty > 1 && patchToCart(id, qty - 1, salePrice);
  };

  const plusQtyHandler = async (
    id: object,
    idproduct: string,
    qty: number,
    salePrice: number
  ) => {
    productCart.map(({ IdProduct, Stock }) => {
      if (IdProduct === idproduct) {
        if (Stock > qty) {
          patchToCart(id, qty + 1, salePrice);
        }
      }
    });
  };

  const delItemHandler = async (id: object) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${id}`);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${curUsername}`
      );

      if (res.data.data.length > 0) {
        setSumQty(res.data.data[0].sumQty);
        setSumSubTotal(res.data.data[0].sumSubTotal);
      } else {
        setSumQty(0);
        setSumSubTotal(0);
        setCartItems([]);
        navigate('/');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__left">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>Product</th>
              <th>Discount</th>
              <th colSpan={2}>Price</th>
              <th>Quantity</th>
              <th>Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const {
                  _id,
                  IdProduct,
                  ImageUrl,
                  ProductName,
                  Price,
                  Disc,
                  SalePrice,
                  Qty,
                  SubTotal,
                } = item;

                return (
                  <tr key={_id} className="checkout__cart--items">
                    <td>
                      <img
                        src={ImageUrl}
                        alt={`Image of ${ProductName}`}
                        className="checkout__cart--img"
                      />
                    </td>
                    <td>
                      <span>{ProductName}</span>
                    </td>
                    <td className="checkout__price--disc">
                      <span>{Disc > 0 && `${Disc}%`}</span>
                    </td>
                    <td className="checkout__price--right checkout__price--stright">
                      <span>
                        {Disc > 0 && Intl.NumberFormat('en-US').format(Price)}
                      </span>
                    </td>
                    <td className="checkout__price--right">
                      <span>
                        {Intl.NumberFormat('en-US').format(SalePrice)}
                      </span>
                    </td>
                    <td className="checkout__td--qty">
                      <div className="checkout__td--qty-box">
                        <AiFillMinusSquare
                          onClick={() => minusQtyHandler(_id, Qty, SalePrice)}
                          className="checkout__icon--minus"
                        />
                        <input
                          type="text"
                          className="checkout__qty--input"
                          value={Qty}
                          onChange={(e) =>
                            qtyChangeHandler(e, _id, IdProduct, SalePrice)
                          }
                        />
                        <AiFillPlusSquare
                          onClick={() =>
                            plusQtyHandler(_id, IdProduct, Qty, SalePrice)
                          }
                          className="checkout__icon--plus"
                        />
                      </div>
                    </td>
                    <td className="checkout__price--right">
                      <span>{Intl.NumberFormat('en-US').format(SubTotal)}</span>
                    </td>
                    <td className="checkout__price--right">
                      <AiOutlineClose
                        onClick={() => delItemHandler(_id)}
                        className="checkout__icon--delete"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={9}>Empty Items</td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="checkout__table--foot">
              <td colSpan={5}>TOTAL</td>
              <td className="checkout__price--center">{sumQty}</td>
              <td className="checkout__price--right">
                Rp. {Intl.NumberFormat('en-US').format(sumSubTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="checkout__right">
        <label className="checkout__address--label">
          Shipping Address
          <textarea
            className="checkout__address--textarea"
            value={curAddress}
            onChange={() => {}}
          />
        </label>
        <label>
          Recipient's Name
          <input
            className="checkout__address--input"
            type="text"
            value={curFullname}
            onChange={() => {}}
          />
        </label>
        <label>
          Phone Number
          <input
            className="checkout__address--input"
            type="text"
            value={curPhone}
            onChange={() => {}}
          />
        </label>
        <hr className="checkout__payment--hr" />
        <label className="checkout__payment--label">
          Payment Method
          <select className="checkout__payment--select">
            <option>BCA Virtual Account</option>
            <option>Mandiri Virtual Account</option>
            <option>BRI Virtual Account</option>
            <option>Niaga Virtual Account</option>
          </select>
        </label>
        <span className="checkout__payment--total-label">Total Tagihan</span>
        <span className="checkout__payment--total">
          Rp. {Intl.NumberFormat('en-US').format(sumSubTotal)}
        </span>
        <button className="btn btn--lg btn--primary checkout__btn--pay">
          PAY
        </button>
      </div>
    </div>
  );
};

export default Checkout;
