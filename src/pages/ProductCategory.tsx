import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import axios from 'axios';

const ProductCategory = () => {
  const [category, setCategory] = useState([]);
  const params = useParams();

  useEffect(() => {
    switch (params.category) {
      case 'special-discount':
        axios
          .get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/products?disc[gt]=0&page=1&limit=50`
          )
          .then(
            (res) =>
              res.data.status === 'success' &&
              setCategory(res.data.data.products)
          )
          .catch((err) => console.error(err));
        break;
      case 'new-arrivals':
        axios
          .get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/products?flag=new&sort=-created_at&page=1&limit=50`
          )
          .then(
            (res) =>
              res.data.status === 'success' &&
              setCategory(res.data.data.products)
          )
          .catch((err) => console.error(err));
        break;
      case 'most-sold':
        axios
          .get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/products?sold[gt]=10&sort=-sold&page=1&limit=50`
          )
          .then(
            (res) =>
              res.data.status === 'success' &&
              setCategory(res.data.data.products)
          )
          .catch((err) => console.error(err));
        break;
      case 'recommendation':
        axios
          .get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/products?flag=recommended&sort=-created_at&page=1&limit=50`
          )
          .then(
            (res) =>
              res.data.status === 'success' &&
              setCategory(res.data.data.products)
          )
          .catch((err) => console.error(err));
        break;
      default:
        if (`${params.category}`.search(/,/) > 0) {
          if (params.category) {
            const param = `${params.category}`.replaceAll(',', '&category=');
            axios
              .get(
                `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/products?${param}&page=1&limit=50`
              )
              .then(
                (res) =>
                  res.data.status === 'success' &&
                  setCategory(res.data.data.products)
              )
              .catch((err) => console.error(err));
          }
        } else {
          axios
            .get(
              `${import.meta.env.VITE_BACKEND_URL}/api/products?${
                params.category
              }&page=1&limit=50`
            )
            .then(
              (res) =>
                res.data.status === 'success' &&
                setCategory(res.data.data.products)
            )
            .catch((err) => console.error(err));
        }
    }
  }, [params.category]);

  return (
    <div className="category">
      <h1 className="category__title heading heading__secondary">
        {params.category
          ?.toUpperCase()
          .replace(/-/g, ' ')
          .replace('CATEGORY=', '')
          .replace('GENDER=', '')
          .replace('PRODUCTNAME[REGEX]=', '')
          .replace('OPTIONS', '')
          .replace(/,/g, ', ')}
      </h1>
      <div className="category__product">
        {category &&
          category.map((product) => {
            const { id_product } = product;
            return <ProductGrid key={id_product} product={product} />;
          })}
      </div>
    </div>
  );
};

export default ProductCategory;
