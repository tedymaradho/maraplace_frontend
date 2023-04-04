import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiOutlineClose,
} from 'react-icons/ai';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, clearCart } from '../redux/cartSlice';

const Checkout = () => {
  const { products, quantity, total } = useSelector((state: any) => state.cart);
  const { email, token } = useSelector((state: any) => state.currentUser);
  const [productCart, setProductCart] = useState<[]>([]);
  const [user, setUser] = useState({
    name: '',
    address: '',
    phone: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStock = async () => {
      let IdProd: any[] = [];
      let IdProdString = '';

      products &&
        products.map((item: any): void => {
          IdProd.push(item.id_product);
        });

      if (IdProd.length > 0) {
        IdProdString = IdProd.toString().replaceAll(',', '&id_product=');
      }

      try {
        const resStock = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?id_product=${IdProdString}`
        );

        if (resStock.data.results > 0) {
          setProductCart(resStock.data.data.products);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStock();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resUser = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users?email=${email}`,
          { headers: { Authorization: 'B1sm1ll4h ' + token } }
        );

        if (resUser.data.status === 'success') {
          setUser({
            name: resUser.data.data.users[0].full_name,
            address: resUser.data.data.users[0].address,
            phone: resUser.data.data.users[0].phone,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const patchToCart = async (id: object, qty: number, salePrice: number) => {
    if (email) {
      try {
        const resStock = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/${id}`,
          {
            qty: qty,
            sub_total: salePrice * qty,
          }
        );

        if (resStock.data.status === 'success') {
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
          } else {
            dispatch(clearCart());
            navigate('/');
          }
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
    idProduct: string,
    SalePrice: number
  ) => {
    productCart.map(({ id_product, stock }) => {
      if (id_product === idProduct) {
        if (stock >= +e.target.value) {
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
    idProduct: string,
    qty: number,
    salePrice: number
  ) => {
    productCart.map(({ id_product, stock }) => {
      if (id_product === idProduct) {
        if (stock > qty) {
          patchToCart(id, qty + 1, salePrice);
        }
      }
    });
  };

  const delItemHandler = async (id: object) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${id}`);

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${email}`
      );

      if (res.data.data.length > 0) {
        dispatch(addToCart(res.data.data[0]));
      } else {
        dispatch(clearCart());
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
            {products ? (
              products.map((item: any) => {
                const {
                  _id,
                  id_product,
                  image_url,
                  product_name,
                  price,
                  disc,
                  sale_price,
                  qty,
                  sub_total,
                } = item;

                return (
                  <tr key={_id} className="checkout__cart--items">
                    <td>
                      <img
                        src={image_url}
                        alt={`Image of ${product_name}`}
                        className="checkout__cart--img"
                      />
                    </td>
                    <td>
                      <span>{product_name}</span>
                    </td>
                    <td className="checkout__price--disc">
                      <span>{disc > 0 && `${disc}%`}</span>
                    </td>
                    <td className="checkout__price--right checkout__price--stright">
                      <span>
                        {disc > 0 && Intl.NumberFormat('en-US').format(price)}
                      </span>
                    </td>
                    <td className="checkout__price--right">
                      <span>
                        {Intl.NumberFormat('en-US').format(sale_price)}
                      </span>
                    </td>
                    <td className="checkout__td--qty">
                      <div className="checkout__td--qty-box">
                        <AiFillMinusSquare
                          onClick={() => minusQtyHandler(_id, qty, sale_price)}
                          className="checkout__icon--minus"
                        />
                        <input
                          type="text"
                          className="checkout__qty--input"
                          value={qty}
                          onChange={(e) =>
                            qtyChangeHandler(e, _id, id_product, sale_price)
                          }
                        />
                        <AiFillPlusSquare
                          onClick={() =>
                            plusQtyHandler(_id, id_product, qty, sale_price)
                          }
                          className="checkout__icon--plus"
                        />
                      </div>
                    </td>
                    <td className="checkout__price--right">
                      <span>
                        {Intl.NumberFormat('en-US').format(sub_total)}
                      </span>
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
              <td className="checkout__price--center">{quantity}</td>
              <td className="checkout__price--right">
                Rp. {Intl.NumberFormat('en-US').format(total)}
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
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
          />
        </label>
        <label>
          Recipient's Name
          <input
            className="checkout__address--input"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </label>
        <label>
          Phone Number
          <input
            className="checkout__address--input"
            type="text"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
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
          Rp. {Intl.NumberFormat('en-US').format(total)}
        </span>
        <button className="btn btn--lg btn--primary checkout__btn--pay">
          PAY
        </button>
      </div>
    </div>
  );
};

export default Checkout;
