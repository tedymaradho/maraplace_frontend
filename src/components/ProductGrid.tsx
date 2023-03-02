import React from 'react';

interface IProps {
  product: {
    ImageUrl: string[];
    Name: string;
    Price: number;
    Merk: string;
  };
}

const ProductGrid: React.FC<IProps> = (props) => {
  const { ImageUrl, Name, Price } = props.product;
  const priceFormat = new Intl.NumberFormat('en-US').format(Price);

  return (
    <div className="product-grid">
      <div className="product-grid__img--box">
        <img
          src={ImageUrl[0]}
          alt={`Image of ${Name}`}
          className="product-grid__img"
        />
      </div>

      <div className="product-grid__item--box">
        <p className="product-grid__title">{Name}</p>
        <p className="product-grid__price">Rp. {priceFormat}</p>
        <button className="btn btn--invert btn--sm">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductGrid;
