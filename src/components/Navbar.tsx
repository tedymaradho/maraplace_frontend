import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { RxAvatar } from 'react-icons/rx';
import { AiFillSetting, AiFillHome } from 'react-icons/ai';
import {
  Select,
  SelectChangeEvent,
  MenuItem,
  Badge,
  Checkbox,
} from '@mui/material/';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './Footer';
import { addToCart } from '../redux/cartSlice';
import { setCurrentUser } from '../redux/userSlice';
import Modal from './Modal';

const Navbar = () => {
  const [categoryMany, setCategoryMany] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [cartDropdownOpen, setCartDropdownOpen] = useState<boolean>(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState<boolean>(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState<boolean>(false);
  const [settingDropdownOpen, setSettingDropdownOpen] =
    useState<boolean>(false);
  const { products, quantity } = useSelector((state: any) => state.cart);
  const { email } = useSelector((state: any) => state.currentUser);
  const { msgShow, msgTitle, msgContent, msgBtnContent } = useSelector(
    (state: any) => state.msg
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = [
    { value: 'dress', label: 'Dress' },
    { value: 'shirt', label: 'Shirt' },
    { value: 'pants', label: 'Pants' },
    { value: 'shorts', label: 'Shorts' },
    { value: 'bag', label: 'Bag' },
    { value: 'hat', label: 'Hat' },
    { value: 'jacket', label: 'Jacket' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'slippers', label: 'Slippers' },
  ];

  useEffect(() => {
    if (localStorage.getItem('userData') && !email) {
      const userData = JSON.parse(localStorage.getItem('userData') || '');

      if (userData.token) {
        dispatch(
          setCurrentUser({ email: userData.email, token: userData.token })
        );
      }
    }
  }, []);

  useEffect(() => {
    if (categoryMany.length > 0) {
      navigate(`category=${categoryMany}`);
    } else {
      navigate('/');
    }
  }, [categoryMany]);

  useEffect(() => {
    if (searchText.length > 0) {
      navigate(`product_name[regex]=${searchText}options`);
    } else {
      navigate('/');
    }
  }, [searchText]);

  useEffect(() => {
    const fetchDataCart = async () => {
      try {
        const resCount = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${email}`
        );

        if (resCount.data.status === 'success') {
          const resItems = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart?email=${email}`
          );

          if (
            resItems.data.status === 'success' &&
            resItems.data.data.cartItems.length > 0
          ) {
            dispatch(
              addToCart({
                products: resItems.data.data.cartItems,
                quantity: resCount.data.data[0].sumQty,
                total: resCount.data.data[0].sumSubTotal,
              })
            );
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    email && fetchDataCart();
  }, [quantity, email]);

  const categoryChangeHandler = (
    event: SelectChangeEvent<typeof categoryMany>
  ) => {
    const {
      target: { value },
    } = event;

    setCategoryMany(typeof value === 'string' ? value.split(',') : value);
  };

  const searchChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      {msgShow && (
        <Modal
          title={msgTitle}
          content={msgContent}
          btnContent={msgBtnContent}
        />
      )}
      <div className="navbar__container">
        <div className="navbar">
          <Link to="/" className="navbar__logo--box">
            <img
              className="navbar__logo--img"
              src="https://firebasestorage.googleapis.com/v0/b/maradho-8c79e.appspot.com/o/logo%2FLOGO%20MARADHO.webp?alt=media&token=1e4f07ad-c9c8-4ac3-99f1-13bc6320947e"
              alt="logo"
            />
            <h1 className="navbar__logo--name">MaraShop</h1>
          </Link>
          <div className="navbar__search">
            <div className="navbar__search--box">
              <input
                className="navbar__search--input"
                type="text"
                placeholder="Search by product name..."
                onChange={searchChangeHandler}
                value={searchText}
              />
              <BiSearchAlt className="icon__search" />
            </div>

            <Select
              multiple
              displayEmpty
              value={categoryMany}
              onChange={categoryChangeHandler}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <p>Category</p>;
                }

                return selected.join(',');
              }}
              sx={{ fontSize: '1.5rem', color: 'gray' }}
            >
              {options.map((opt) => (
                <MenuItem
                  sx={{ fontSize: '1.5rem' }}
                  key={opt.value}
                  value={opt.value}
                >
                  <Checkbox checked={categoryMany.indexOf(opt.value) > -1} />
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="navbar__link">
            <Link
              onClick={() => {
                setCartDropdownOpen(false);
                setNotifDropdownOpen(false);
                setAvatarDropdownOpen(false);
                setSettingDropdownOpen(false);
                setSearchText('');
                setCategoryMany([]);
              }}
              to="/"
              className="navbar__link--box"
            >
              <AiFillHome className="icon__home" />
              Home
            </Link>
            <div
              onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
              onMouseEnter={() => {
                setCartDropdownOpen(true);
                setNotifDropdownOpen(false);
                setAvatarDropdownOpen(false);
                setSettingDropdownOpen(false);
              }}
              className="navbar__link--box"
            >
              <Badge
                badgeContent={quantity}
                color="error"
                className="icon__badge"
              >
                <FaShoppingCart className="icon__cart" />
              </Badge>
              Cart
            </div>
            <div
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              onMouseEnter={() => {
                setNotifDropdownOpen(true);
                setCartDropdownOpen(false);
                setAvatarDropdownOpen(false);
                setSettingDropdownOpen(false);
              }}
              className="navbar__link--box"
            >
              <Badge badgeContent={0} color="error" className="icon__badge">
                <IoMdNotifications className="icon__notif" />
              </Badge>
              Notif
            </div>

            <div
              onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
              onMouseEnter={() => {
                setAvatarDropdownOpen(true);
                setCartDropdownOpen(false);
                setNotifDropdownOpen(false);
                setSettingDropdownOpen(false);
              }}
              className="navbar__link--box"
            >
              <FaUserAlt className="icon__user" />
              User
            </div>

            <div
              onClick={() => setSettingDropdownOpen(!settingDropdownOpen)}
              onMouseEnter={() => {
                setSettingDropdownOpen(true);
                setCartDropdownOpen(false);
                setNotifDropdownOpen(false);
                setAvatarDropdownOpen(false);
              }}
              className="navbar__link--box"
            >
              <AiFillSetting className="icon__setting" />
              Setting
            </div>
          </div>
        </div>
        {cartDropdownOpen && (
          <div
            onMouseLeave={() => setCartDropdownOpen(false)}
            className="navbar__cart"
          >
            <div className="navbar__cart--dropdown">
              {products ? (
                products.map((item: any) => {
                  const { _id, image_url, product_name, sale_price, qty } =
                    item;

                  return (
                    <div key={_id} className="navbar__cart--items">
                      <img
                        src={image_url}
                        alt={`Image of ${product_name}`}
                        className="navbar__cart--img"
                      />
                      <span className="navbar__cart--price">
                        Rp. {Intl.NumberFormat('en-US').format(sale_price)}
                      </span>
                      x<span>{qty}</span>
                      <span>{product_name}</span>
                    </div>
                  );
                })
              ) : (
                <p>Empty Items</p>
              )}
            </div>
            {products && (
              <Link
                onClick={() => setCartDropdownOpen(false)}
                to="/checkout"
                className="navbar__cart--link"
              >
                Checkout
              </Link>
            )}
          </div>
        )}

        {notifDropdownOpen && (
          <div
            onMouseLeave={() => setNotifDropdownOpen(false)}
            className="navbar__notif"
          >
            <div className="navbar__notif--dropdown">
              <Link to="" className="navbar__notif--transaction">
                My Transaction
              </Link>
            </div>
          </div>
        )}

        {avatarDropdownOpen && (
          <div
            onMouseLeave={() => setAvatarDropdownOpen(false)}
            className="navbar__user"
          >
            <div className="navbar__user--dropdown">
              <div>
                <RxAvatar className="icon__avatar" />
                <p>{email}</p>
              </div>
              {email ? (
                <>
                  <Link
                    onClick={() => setAvatarDropdownOpen(false)}
                    className="navbar__user--item"
                    to=""
                  >
                    Change Password
                  </Link>
                  <Link
                    onClick={() => {
                      setAvatarDropdownOpen(false);
                      localStorage.removeItem('userData');
                    }}
                    className="navbar__user--item"
                    to="/login"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    onClick={() => setAvatarDropdownOpen(false)}
                    className="navbar__user--item"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                  <Link
                    onClick={() => setAvatarDropdownOpen(false)}
                    className="navbar__user--item"
                    to="/login"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        {settingDropdownOpen && (
          <div
            onMouseLeave={() => setSettingDropdownOpen(false)}
            className="navbar__setting"
          >
            <div className="navbar__setting--dropdown">
              <Link
                onClick={() => setSettingDropdownOpen(false)}
                to="/product/list"
                className="navbar__setting--item"
              >
                <p>Manage Products</p>
              </Link>
              <Link
                onClick={() => setSettingDropdownOpen(false)}
                to="/product/add"
                className="navbar__setting--item"
              >
                <p>Add Product</p>
              </Link>
              <Link
                onClick={() => setSettingDropdownOpen(false)}
                to=""
                className="navbar__setting--item"
              >
                <p>Stock</p>
              </Link>
              <Link
                onClick={() => setSettingDropdownOpen(false)}
                to=""
                className="navbar__setting--item"
              >
                <p>Discount</p>
              </Link>
              <Link
                onClick={() => setSettingDropdownOpen(false)}
                to="/settings"
                className="navbar__setting--item"
              >
                <p>Settings</p>
              </Link>
            </div>
          </div>
        )}
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
