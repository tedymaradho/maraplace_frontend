import { BsFacebook } from 'react-icons/bs';
import { TiSocialYoutubeCircular } from 'react-icons/ti';
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer">
      <ul className="footer__list">
        <li className="footer__list--title">Popular Category</li>
        <li className="footer__list--item">Bag</li>
        <li className="footer__list--item">Dress</li>
        <li className="footer__list--item">Shirt</li>
        <li className="footer__list--item">Shoes</li>
      </ul>
      <ul className="footer__list">
        <li className="footer__list--title">Marashop</li>
        <li className="footer__list--item">About us</li>
        <li className="footer__list--item">Help center</li>
        <li className="footer__list--item">Career</li>
        <li className="footer__list--item">News</li>
      </ul>
      <ul className="footer__list">
        <li className="footer__list--title">Follow us on</li>
        <li className="footer__list--item">
          <div className="footer__icons">
            <BsFacebook className="icon__fb" />
            <AiFillTwitterCircle className="icon__tw" />
            <AiFillInstagram className="icon__ig" />
            <TiSocialYoutubeCircular className="icon__yt" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
