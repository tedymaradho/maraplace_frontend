import React from 'react';

interface IProps {
  product: {
    imageUrl: string[];
    name: string;
    price: number;
    merk: string;
  };
}

const ProductGrid: React.FC<IProps> = (props) => {
  const { imageUrl, name, price } = props.product;
  const priceFormat = new Intl.NumberFormat('en-US').format(price);

  return (
    <div className="product-grid">
      <div className="product-grid__img--box">
        <img
          src={imageUrl[0]}
          alt={`Image of ${name}`}
          className="product-grid__img"
        />
      </div>

      <div className="product-grid__item--box">
        <p className="product-grid__title">{name}</p>
        <p className="product-grid__price">Rp. {priceFormat}</p>
        <button className="btn btn--invert btn--sm">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductGrid;
