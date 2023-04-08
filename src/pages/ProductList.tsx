import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { GrNext, GrPrevious } from 'react-icons/gr';

const ProductList = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState<{
    limit: number;
    current: number;
    count: number;
    paginate: number[];
  }>({
    limit: 10,
    current: 1,
    count: 0,
    paginate: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?page=${
            page.current
          }&limit=${page.limit}&sort=id_product`
        );
        if (res.data.status === 'success') {
          setProducts(res.data.data.products);

          const resCount = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/count`
          );

          if (resCount.data.status === 'success') {
            let temp = [] as number[];
            for (
              let i = 1;
              i <= Math.ceil(resCount.data.data / page.limit);
              i++
            ) {
              temp.push(i);
            }

            setPage({
              ...page,
              count: Math.ceil(resCount.data.data / page.limit),
              paginate: temp,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page.limit, page.current]);

  const handleChangeNumOfRows = (e: ChangeEvent<HTMLSelectElement>) => {
    setPage({ ...page, limit: +e.target.value });
  };

  const pageClickHandler = (p: number) => {
    setPage({ ...page, current: p + 1 });
  };

  return (
    <div className="product-list">
      <h1 className="product-list__title">PRODUCTS</h1>
      <div className="product-list__nor">
        <label className="product-list__nor--label">Number of rows</label>
        <select
          defaultValue={10}
          onChange={handleChangeNumOfRows}
          className="product-list__nor--select"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={300}>300</option>
          <option value={400}>400</option>
          <option value={500}>500</option>
          <option value={600}>600</option>
          <option value={700}>700</option>
          <option value={800}>800</option>
          <option value={900}>900</option>
          <option value={1000}>1000</option>
        </select>
      </div>
      <div className="product-list__x-scroll">
        <table className="product-list__table" border={1} cellSpacing={0}>
          <thead>
            <tr className="product-list__tr">
              <th className="product-list__th"></th>
              <th className="product-list__th">Id Product</th>
              <th className="product-list__th">Product Name</th>
              <th className="product-list__th">Merk</th>
              <th className="product-list__th">Size</th>
              <th className="product-list__th">Gender</th>
              <th className="product-list__th">Description</th>
              <th className="product-list__th">Category</th>
              <th className="product-list__th">Price</th>
              <th className="product-list__th">Discount</th>
              <th className="product-list__th">Sale Price</th>
              <th className="product-list__th">Stock</th>
              <th className="product-list__th">UoM Name</th>
              <th className="product-list__th">Image</th>
              <th className="product-list__th">Vendor</th>
              <th className="product-list__th">Sold</th>
              <th className="product-list__th">Flag</th>
              <th className="product-list__th">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((prod, idx) => (
                <tr key={prod.id_product} className="product-list__tr">
                  <td className="product-list__action">
                    <FiEdit className="product-list__edit-icon" />
                    <AiOutlineDelete className="product-list__delete-icon" />
                  </td>
                  <td className="product-list__td">{prod.id_product}</td>
                  <td className="product-list__td">{prod.product_name}</td>
                  <td className="product-list__td">{prod.merk}</td>
                  <td className="product-list__td">{prod.size}</td>
                  <td className="product-list__td">{prod.gender}</td>
                  <td className="product-list__td">{prod.desc}</td>
                  <td className="product-list__td">{prod.category}</td>
                  <td className="product-list__td">{prod.price}</td>
                  <td className="product-list__td">{prod.disc}</td>
                  <td className="product-list__td">{prod.sale_price}</td>
                  <td className="product-list__td">{prod.stock}</td>
                  <td className="product-list__td">{prod.uom_name}</td>
                  <td className="product-list__td">{prod.images.join()}</td>
                  <td className="product-list__td">{prod.vendor.join()}</td>
                  <td className="product-list__td">{prod.sold}</td>
                  <td className="product-list__td">{prod.flag}</td>
                  <td className="product-list__td">{prod.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="product-list__paginate">
        <GrPrevious className="product-list__paginate--icon" />
        {page.paginate.map((pg, idx) => (
          <a
            onClick={() => pageClickHandler(idx)}
            className={`product-list__paginate--page ${
              idx + 1 === page.current && 'product-list__paginate--page-active'
            }`}
            key={idx}
          >
            {pg}
          </a>
        ))}
        <GrNext className="product-list__paginate--icon" />
      </div>
    </div>
  );
};

export default ProductList;
