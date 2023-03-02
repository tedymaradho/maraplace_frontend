import { Link, Outlet } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Announcement from './Announcement';
import Footer from './Footer';

const animatedComponents = makeAnimated();

const Navbar = () => {
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

  return (
    <div className="navbar__container">
      <Announcement />
      <div className="navbar">
        <div className="navbar__logo--box">
          <img
            className="navbar__logo--img"
            src="https://firebasestorage.googleapis.com/v0/b/maradho-8c79e.appspot.com/o/logo%2FLOGO%20MARADHO.webp?alt=media&token=1e4f07ad-c9c8-4ac3-99f1-13bc6320947e"
            alt="logo"
          />
          <h1 className="navbar__logo--name">MaraShop</h1>
        </div>
        <div className="navbar__search">
          <div className="navbar__search--box">
            <input
              className="navbar__search--input"
              type="text"
              placeholder="Search..."
            />
            <BiSearchAlt className="icon__search" />
          </div>
          <label className="navbar__search--label-category">
            Category
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={options}
            />
          </label>
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
