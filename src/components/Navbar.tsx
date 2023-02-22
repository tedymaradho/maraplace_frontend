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
            src="https://firebasestorage.googleapis.com/v0/b/maradho-8c79e.appspot.com/o/marashop%2FLOGO%20MARADHO.png?alt=media&token=fd6e0581-d52b-45ba-93c6-b1747650be10"
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
