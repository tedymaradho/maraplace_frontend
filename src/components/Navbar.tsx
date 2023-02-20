import { Link, Outlet } from 'react-router-dom';
import { BiSearchAlt } from 'react-icons/bi';

const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="navbar__logo--box">
          <img
            className="navbar__logo--img"
            src="./src/assets/logo.png"
            alt="logo"
          />
          <h1 className="navbar__logo--name">MaraPlace</h1>
        </div>
        <div className="navbar__search--box">
          <input
            className="navbar__search--input"
            type="text"
            placeholder="Search"
          />
          <BiSearchAlt className="navbar__search--icon" />
          <select className="navbar__search--category">
            <option>Category</option>
            <option>Category 1</option>
            <option>Category 2</option>
          </select>
        </div>
        <Link className="btn" to="">
          SignUp
        </Link>
        <Link className="btn" to="">
          Login
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Navbar;
