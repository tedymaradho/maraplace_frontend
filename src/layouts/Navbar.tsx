import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import Footer from './Footer';
import { Select, SelectChangeEvent, MenuItem, Badge } from '@mui/material/';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  sumQtyAtom,
  cartItemsAtom,
  currentUserAtom,
  sumSubTotalAtom,
} from '../recoils';
import axios from 'axios';

const Navbar = () => {
  const [categoryMany, setCategoryMany] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [cartDropdownOpen, setCartDropdownOpen] = useState<boolean>(false);
  const { curUserId } = useRecoilValue(currentUserAtom);
  const [sumQty, setSumQty] = useRecoilState(sumQtyAtom);
  const setSumSubTotal = useSetRecoilState(sumSubTotalAtom);
  const [cartItems, setCartItems] = useRecoilState(cartItemsAtom);

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
    if (categoryMany.length > 0) {
      navigate(`Category=${categoryMany}`);
    } else {
      navigate('/');
    }
  }, [categoryMany]);

  useEffect(() => {
    if (searchText.length > 0) {
      navigate(`ProductName[regex]=${searchText}options`);
    } else {
      navigate('/');
    }
  }, [searchText]);

  useEffect(() => {
    const fetchDataCart = async () => {
      try {
        const resCount = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/stats/${curUserId}`
        );
        if (resCount.data.data.length > 0) {
          setSumQty(resCount.data.data[0].sumQty);
          setSumSubTotal(resCount.data.data[0].sumSubTotal);
        }

        const resItems = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart?IdUser=${curUserId}`
        );

        resItems.data.results > 0 && setCartItems(resItems.data.data.cartItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataCart();
  }, [sumQty]);

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
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="navbar__link">
            <Badge
              onClick={() => setCartDropdownOpen(!cartDropdownOpen)}
              badgeContent={sumQty}
              color="error"
              className="icon__badge"
            >
              <FaShoppingCart className="icon__cart" />
            </Badge>
            <Link className="navbar__link--item" to="">
              SignUp
            </Link>
            <Link className="navbar__link--item" to="">
              Login
            </Link>
          </div>
        </div>
        {cartDropdownOpen && (
          <div className="navbar__cart--dropdown">
            {cartItems.length > 0 ? (
              cartItems.map((item) => {
                const { _id, ImageUrl, ProductName, SalePrice, Qty } = item;

                return (
                  <div key={_id} className="navbar__cart--items">
                    <img
                      src={ImageUrl}
                      alt={`Image of ${ProductName}`}
                      className="navbar__cart--img"
                    />
                    <span className="navbar__cart--price">
                      Rp. {Intl.NumberFormat('en-US').format(SalePrice)}
                    </span>
                    x<span>{Qty}</span>
                    <span>{ProductName}</span>
                  </div>
                );
              })
            ) : (
              <p>Empty Items</p>
            )}
            {cartItems.length > 0 && (
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
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
