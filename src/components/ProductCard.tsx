import React from 'react';
import Button from './Button';

interface IProps {
  product: {
    imageUrl: string;
    name: string;
    price: number;
    sold: number;
  };
}

const ProductCard: React.FC<IProps> = (props) => {
  const { imageUrl, name, price, sold } = props.product;
  const priceFormat = new Intl.NumberFormat('en-US').format(price);

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={`${name}`} width="300px" height="300px" />
      <div className="footer">
        <p className="name">{name}</p>
        <label>
          Harga: <span className="price">{priceFormat}</span>
        </label>
        <label>
          Terjual: <span className="price">{sold}</span>
        </label>
      </div>
      <Button buttonType="inverted">Add to card</Button>
    </div>
  );
};

export default ProductCard;
