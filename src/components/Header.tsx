import {
  GiLargeDress,
  GiMonclerJacket,
  GiSonicShoes,
  GiSlippers,
  GiUnderwearShorts,
  GiArmoredPants,
} from 'react-icons/gi';
import { FaRedhat, FaTshirt, FaMale, FaFemale } from 'react-icons/fa';
import { BsFillHandbagFill } from 'react-icons/bs';
import { AiFillRightCircle, AiFillLeftCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const [bannersImage, setBannersImage] = useState([]);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/settings?IdSetting=banner`)
      .then((res) => setBannersImage(res.data.data.setting[0].Set1))
      .catch((err) => console.error(err));
  }, []);

  const prevImageHandler = () => {
    if (marginLeft === 0) {
      setMarginLeft((bannersImage.length - 1) * -100);
    } else {
      setMarginLeft(marginLeft + 100);
    }
  };

  const nextImageHandler = () => {
    if (marginLeft === (bannersImage.length - 1) * -100) {
      setMarginLeft(0);
    } else {
      setMarginLeft(marginLeft - 100);
    }
  };

  setTimeout(nextImageHandler, 4000);

  return (
    <div className="header">
      <div className="header__banner">
        <AiFillLeftCircle
          onClick={prevImageHandler}
          className="header__banner--btn-left"
        />
        {bannersImage.map((banner, index) => {
          return (
            <div className="header__banner--box" key={index}>
              <img
                className="header__banner--img"
                style={{ marginLeft: marginLeft + '%' }}
                src={banner}
                alt="image of banner"
              />
            </div>
          );
        })}
        <AiFillRightCircle
          onClick={nextImageHandler}
          className="header__banner--btn-right"
        />
      </div>

      <div className="header__category">
        <Link to="Gender=male" className="header__category--label">
          <FaMale className="icon__male" />
          Male
        </Link>
        <Link to="Gender=female" className="header__category--label">
          <FaFemale className="icon__female" />
          Female
        </Link>
        <Link to="Category=dress" className="header__category--label">
          <GiLargeDress className="icon__dress" />
          Dress
        </Link>
        <Link to="Category=shirt" className="header__category--label">
          <FaTshirt className="icon__shirt" />
          Shirt
        </Link>
        <Link to="Category=pants" className="header__category--label">
          <GiArmoredPants className="icon__pants" />
          Long pants
        </Link>
        <Link to="Category=shorts" className="header__category--label">
          <GiUnderwearShorts className="icon__shorts" />
          Shorts
        </Link>
        <Link to="Category=bag" className="header__category--label">
          <BsFillHandbagFill className="icon__bag" />
          Bag
        </Link>
        <Link to="Category=hat" className="header__category--label">
          <FaRedhat className="icon__hat" />
          Hat
        </Link>
        <Link to="Category=jacket" className="header__category--label">
          <GiMonclerJacket className="icon__jacket" />
          Jacket
        </Link>
        <Link to="Category=shoes" className="header__category--label">
          <GiSonicShoes className="icon__shoes" />
          Shoes
        </Link>
        <Link to="Category=slippers" className="header__category--label">
          <GiSlippers className="icon__slippers" />
          Slippers
        </Link>
      </div>
    </div>
  );
};

export default Header;
