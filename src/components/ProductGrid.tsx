import React from 'react';

interface IProps {
  product: {
    ImageUrl: string[];
    Name: string;
    Price: number;
    Disc: number;
    PriceAfterDisc: number;
  };
}

const ProductGrid: React.FC<IProps> = (props) => {
  const { ImageUrl, Name, Price, Disc, PriceAfterDisc } = props.product;
  const priceFormat = new Intl.NumberFormat('en-US').format(Price);
  const priceDiscFormat = new Intl.NumberFormat('en-US').format(PriceAfterDisc);

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
        {Disc > 0 ? (
          <div>
            <div className="product-grid__disc--box">
              <p className="product-grid__price-before">Rp. {priceFormat}</p>
              <p className="product-grid__disc">{Disc}%</p>
            </div>
            <p className="product-grid__price-disc">Rp. {priceDiscFormat}</p>
          </div>
        ) : (
          <p className="product-grid__price">Rp. {priceFormat}</p>
        )}
        <button className="btn btn--invert btn--sm">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductGrid;
