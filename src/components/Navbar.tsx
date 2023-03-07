import { ChangeEvent, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import Footer from './Footer';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Navbar = () => {
  const [categoryMany, setCategoryMany] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');

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
      navigate(`Name[regex]=${searchText}`);
    } else {
      navigate('/');
    }
  }, [searchText]);

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
              placeholder="Search..."
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
            style={{ fontSize: '15px', color: 'gray' }}
          >
            {options.map((opt) => (
              <MenuItem
                key={opt.value}
                value={opt.value}
                style={{ fontSize: '15px' }}
              >
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="navbar__link">
          <FaShoppingCart className="icon__cart" />
          <Link className="navbar__link--item" to="">
            SignUp
          </Link>
          <Link className="navbar__link--item" to="">
            Login
          </Link>
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Navbar;
