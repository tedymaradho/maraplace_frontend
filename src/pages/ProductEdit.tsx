import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setLoading, setSuccess, setError, setHidden } from '../redux/msgSlice';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import ProductForm from './ProductForm';

const INITIAL_PRODUCT = {
  _id: {},
  id_product: '',
  product_name: '',
  merk: '',
  size: '',
  gender: '',
  desc: '',
  category: '',
  price: 0,
  stock: 0,
  uom_name: '',
  barcode: '',
  images: [] as File[],
  vendor: '',
  status: '',
};

const ProductEdit = () => {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const { isLoading, isSuccess, isError } = useSelector(
    (state: any) => state.msg
  );

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const productInit = async () => {
      try {
        const resInit = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products?id_product=${
            params.idproduct
          }`
        );
        resInit.data.status === 'success' &&
          setProduct(resInit.data.data.products[0]);
      } catch (error) {
        dispatch(setError());
        console.log(error);
      }
    };

    productInit();
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setLoading());
    try {
      const resUpdate = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${product._id}`,
        {
          product_name: product.product_name,
          merk: product.merk,
          size: product.size,
          gender: product.gender,
          desc: product.desc,
          category: product.category,
          price: +product.price,
          sale_price: +product.price,
          stock: +product.stock,
          uom_name: product.uom_name,
          barcode: product.barcode,
          status: product.status,
        }
      );

      resUpdate.data.status === 'success' && dispatch(setSuccess());
    } catch (error) {
      dispatch(setError());
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && (
        <Modal
          title="Success"
          content="The product has been successfully edited"
          btnContent="Ok"
        />
      )}
      {isError && (
        <Modal
          title="Fail"
          content="Failed to update product"
          btnContent="Ok"
        />
      )}
      <ProductForm
        title="EDIT PRODUCT"
        product={product}
        submitHandler={submitHandler}
        setProduct={setProduct}
        btnContent="Update Product"
      />
    </>
  );
};

export default ProductEdit;
