import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const CategoryProduct = () => {
  const [category, setCategory] = useState([]);
  const params = useParams();

  useEffect(() => {
    switch (params.category) {
      case 'special-discount':
        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?Disc[gt]=0&page=1&limit=50`
        )
          .then((response) => response.json())
          .then((res) => setCategory(res.data.products))
          .catch((err) => console.error(err.message));
        break;
      case 'new-arrivals':
        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?Flag=new&sort=-CreatedAt&page=1&limit=50`
        )
          .then((response) => response.json())
          .then((res) => setCategory(res.data.products))
          .catch((err) => console.error(err.message));
        break;
      case 'most-sold':
        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?Sold[gt]=10&sort=-Sold&page=1&limit=50`
        )
          .then((response) => response.json())
          .then((res) => setCategory(res.data.products))
          .catch((err) => console.error(err.message));
        break;
      case 'recommendation':
        fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/products?Flag=recommended&sort=-CreatedAt&page=1&limit=50`
        )
          .then((response) => response.json())
          .then((res) => setCategory(res.data.products))
          .catch((err) => console.error(err.message));
        break;
      default:
        if (`${params.category}`.search(/,/) > 0) {
          if (params.category) {
            const param = `${params.category}`.replaceAll(',', '&Category=');
            fetch(
              `${
                import.meta.env.VITE_BACKEND_URL
              }/api/products?${param}&page=1&limit=50`
            )
              .then((response) => response.json())
              .then((res) => setCategory(res.data.products))
              .catch((err) => console.error(err.message));
          }
        } else {
          fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/products?${
              params.category
            }&page=1&limit=50`
          )
            .then((response) => response.json())
            .then((res) => setCategory(res.data.products))
            .catch((err) => console.error(err.message));
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
