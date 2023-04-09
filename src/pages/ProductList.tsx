import React, { useEffect, useRef, useState } from 'react';
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
    paginate: string[];
    search: string;
    sort: string;
  }>({
    limit: 10,
    current: 1,
    count: 0,
    paginate: [],
    search: '',
    sort: 'id_product',
  });

  const selectSearchByRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(page.sort);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?page=${
            page.current
          }&limit=${page.limit}&sort=${page.sort}&${page.search}`
        );
        if (res.data.status === 'success') {
          setProducts(res.data.data.products);

          const resCount = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/count`
          );

          if (resCount.data.status === 'success') {
            let range = [] as string[];
            let delta = 2;
            let left = page.current - delta;
            let right = page.current + delta + 1;
            let rangeWithDots = [] as string[];
            let l: number = 0;

            for (
              let i = 1;
              i <= Math.ceil(resCount.data.data / page.limit);
              i++
            ) {
              if (
                i == 1 ||
                i == Math.ceil(resCount.data.data / page.limit) ||
                (i >= left && i < right)
              ) {
                range.push(i.toString());
              }
            }

            for (let i of range) {
              if (l) {
                if (+i - l === 2) {
                  rangeWithDots.push((l + 1).toString());
                } else if (+i - l !== 1) {
                  rangeWithDots.push('...');
                }
              }
              rangeWithDots.push(i);
              l = +i;
            }

            setPage({
              ...page,
              count: Math.ceil(resCount.data.data / page.limit),
              paginate: rangeWithDots,
            });
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page.limit, page.current, page.search, page.sort]);

  const handleChangeNumOfRows = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage({ ...page, limit: +e.target.value });
  };

  const pageClickHandler = (p: number) => {
    setPage({ ...page, current: p });
  };

  const handleChangeSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage({ ...page, sort: e.target.value.toString() });
  };

  const handleChangeSearchBy = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setPage({
        ...page,
        search: `${selectSearchByRef.current?.value}[regex]=${e.target.value}options`,
      });
    } else {
      setPage({ ...page, search: '' });
    }
  };

  const previousHandler = () => {
    if (page.current > 1) {
      setPage({ ...page, current: page.current - 1 });
    }
  };

  const nextHandler = () => {
    if (page.current < page.count) {
      setPage({ ...page, current: page.current + 1 });
    }
  };

  return (
    <div className="product-list">
      <h1 className="product-list__title">PRODUCTS</h1>
      <div className="product-list__filter">
        <div className="product-list__search">
          <label className="product-list__search--label">Search by</label>
          <select
            defaultValue="id_product"
            className="product-list__search--select"
            ref={selectSearchByRef}
          >
            <option value="id_product">Id Product</option>
            <option value="product_name">Product Name</option>
            <option value="merk">Merk</option>
            <option value="gender">Gender</option>
            <option value="desc">Description</option>
            <option value="category">Category</option>
            <option value="vendor">Vendor</option>
            <option value="flag">Flag</option>
            <option value="status">Status</option>
          </select>
          <input
            type="text"
            placeholder="Enter here to search..."
            className="product-list__search--input"
            onChange={handleChangeSearchBy}
          />
        </div>

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

          <label className="product-list__nor--label">Sort by</label>
          <select
            defaultValue="id_product"
            onChange={handleChangeSortBy}
            className="product-list__nor--select"
          >
            <option value="id_product">Id Product</option>
            <option value="-id_product">Id Product (Desc)</option>
            <option value="product_name">Product Name</option>
            <option value="-product_name">Product Name (Desc)</option>
            <option value="category">Category</option>
            <option value="-category">Category (Desc)</option>
            <option value="price">Price</option>
            <option value="-price">Price (Desc)</option>
            <option value="disc">Discount</option>
            <option value="-disc">Discount (Desc)</option>
            <option value="sale_price">Sale Price</option>
            <option value="-sale_price">Sale Price (Desc)</option>
            <option value="stock">Stock</option>
            <option value="-stock">Stock (Desc)</option>
            <option value="sold">Sold</option>
            <option value="-sold">Sold (Desc)</option>
            <option value="flag">Flag</option>
            <option value="-flag">Flag (Desc)</option>
            <option value="status">Status</option>
            <option value="-status">Status (Desc)</option>
          </select>
        </div>
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
        <GrPrevious
          onClick={previousHandler}
          className="product-list__paginate--icon"
        />
        {page.paginate.map((pg) => (
          <a
            onClick={() => pageClickHandler(+pg)}
            className={`product-list__paginate--page ${
              +pg === page.current && 'product-list__paginate--page-active'
            }`}
            key={pg}
          >
            {pg}
          </a>
        ))}
        <GrNext
          onClick={nextHandler}
          className="product-list__paginate--icon"
        />
      </div>
    </div>
  );
};

export default ProductList;
