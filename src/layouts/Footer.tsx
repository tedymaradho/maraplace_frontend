import { BsFacebook } from 'react-icons/bs';
import { TiSocialYoutubeCircular } from 'react-icons/ti';
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';

const Footer = () => {
  return (
    <div className="footer__container">
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
        <ul className="footer__list">
          <li className="footer__list--title">Download our application</li>
          <li className="footer__list--item">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/marashop-29ea9.appspot.com/o/images%2Ffooter%2Fapp-store.webp?alt=media&token=8e408207-923d-4f67-af0e-3ac54b39c56b"
              alt="icon app store"
              className="footer__icon--app-store"
            />
          </li>
        </ul>
      </div>
      <div className="footer__developer">
        Built using
        <div className="footer__developer--icon">
          <FaReact className="icon__react" />
          &nbsp;
          <SiTypescript className="icon__typescript" />
          &nbsp;
          <FaNodeJs className="icon__nodejs" />
        </div>
        by Tedy Maradho
      </div>
    </div>
  );
};

export default Footer;
