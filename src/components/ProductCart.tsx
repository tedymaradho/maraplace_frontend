import React from 'react';

interface IProps {
  product: {
    imageUrl: string[];
    name: string;
    price: number;
    merk: string;
  };
}

const ProductCart: React.FC<IProps> = (props) => {
  const { imageUrl, name, price } = props.product;
  const priceFormat = new Intl.NumberFormat('en-US').format(price);

  return (
    <div className="product-cart">
      <div className="product-cart__img--box">
        <img
          src={imageUrl[0]}
          alt={`Image of ${name}`}
          className="product-cart__img"
        />
      </div>

      <div className="product-cart__item--box">
        <p className="product-cart__title">{name}</p>
        <p className="product-cart__price">Rp. {priceFormat}</p>
        <button className="btn btn--invert btn--sm">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCart;
