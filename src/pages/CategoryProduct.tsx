import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import axios from 'axios';

const CategoryProduct = () => {
  const [category, setCategory] = useState([]);
  const params = useParams();

  useEffect(() => {
    switch (params.category) {
      case 'special-discount':
        axios
          .get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/products?Disc[gt]=0&page=1&limit=50`
          )
          .then((res) => setCategory(res.data.data.products))
          .catch((err) => console.error(err));
        break;
      case 'new-arrivals':
        axios
          .get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/products?Flag=new&sort=-CreatedAt&page=1&limit=50`
          )
          .then((res) => setCategory(res.data.data.products))
          .catch((err) => console.error(err));
        break;
      case 'most-sold':
        axios
          .get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/products?Sold[gt]=10&sort=-Sold&page=1&limit=50`
          )
          .then((res) => setCategory(res.data.data.products))
          .catch((err) => console.error(err));
        break;
      case 'recommendation':
        axios
          .get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/products?Flag=recommended&sort=-CreatedAt&page=1&limit=50`
          )
          .then((res) => setCategory(res.data.data.products))
          .catch((err) => console.error(err));
        break;
      default:
        if (`${params.category}`.search(/,/) > 0) {
          if (params.category) {
            const param = `${params.category}`.replaceAll(',', '&Category=');
            axios
              .get(
                `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/products?${param}&page=1&limit=50`
              )
              .then((res) => setCategory(res.data.data.products))
              .catch((err) => console.error(err));
          }
        } else {
          axios
            .get(
              `${import.meta.env.VITE_BACKEND_URL}/api/products?${
                params.category
              }&page=1&limit=50`
            )
            .then((res) => setCategory(res.data.data.products))
            .catch((err) => console.error(err));
        }
    }
  }, [params.category]);

  useEffect(() => {
    const handleContextmenu = (e: any) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextmenu);
    return function cleanup() {
      document.removeEventListener('contextmenu', handleContextmenu);
    };
  }, []);

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
            const { IdProduct } = product;
            return <ProductGrid key={IdProduct} product={product} />;
          })}
      </div>
    </div>
  );
};

export default CategoryProduct;
