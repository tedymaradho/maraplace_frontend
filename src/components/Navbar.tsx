import { Link, Outlet } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
    <>
      <div className="navbar">
        <div className="navbar__logo--box">
          <img
            className="navbar__logo--img"
            src="./src/assets/logo.png"
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
    </>
  );
};

export default Navbar;
