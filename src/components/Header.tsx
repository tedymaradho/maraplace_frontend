import {
  GiLargeDress,
  GiMonclerJacket,
  GiSonicShoes,
  GiSlippers,
  GiUnderwearShorts,
  GiArmoredPants,
} from 'react-icons/gi';
import { FaRedhat, FaTshirt } from 'react-icons/fa';
import { BsFillHandbagFill } from 'react-icons/bs';
import { AiFillRightCircle, AiFillLeftCircle } from 'react-icons/ai';
import { BiGridSmall } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const Header = () => {
  const [bannersImage, setBannersImage] = useState([]);
  const [marginLeft, setMarginLeft] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/settings?IdSetting=banner`)
      .then((response) => response.json())
      .then((res) => setBannersImage(res.data.setting[0].Set1))
      .catch((err) => console.error(err.message));
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
        <label className="header__category--label">
          <GiLargeDress className="icon__dress" />
          Dress
        </label>
        <label className="header__category--label">
          <FaTshirt className="icon__shirt" />
          Shirt
        </label>
        <label className="header__category--label">
          <GiArmoredPants className="icon__pants" />
          Long pants
        </label>
        <label className="header__category--label">
          <GiUnderwearShorts className="icon__shorts" />
          Shorts
        </label>
        <label className="header__category--label">
          <BsFillHandbagFill className="icon__bag" />
          Bag
        </label>
        <label className="header__category--label">
          <FaRedhat className="icon__hat" />
          Hat
        </label>
        <label className="header__category--label">
          <GiMonclerJacket className="icon__jacket" />
          Jacket
        </label>
        <label className="header__category--label">
          <GiSonicShoes className="icon__shoes" />
          Shoes
        </label>
        <label className="header__category--label">
          <GiSlippers className="icon__slippers" />
          Slippers
        </label>
        <label className="header__category--label">
          <BiGridSmall className="icon__all" />
          All categories
        </label>
      </div>
    </div>
  );
};

export default Header;
