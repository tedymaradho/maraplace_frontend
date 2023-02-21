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
import { BiGridSmall } from 'react-icons/bi';

const Header = () => {
  return (
    <div className="header">
      <div className="header__banner">
        <img
          className="header__banner--img"
          src="https://firebasestorage.googleapis.com/v0/b/maradho-8c79e.appspot.com/o/marashop%2Fbanner.webp?alt=media&token=81131a1f-3852-43a7-b30c-3c0867207c31"
          alt="image of banner"
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
