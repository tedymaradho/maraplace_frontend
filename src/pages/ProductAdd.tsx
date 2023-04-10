import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { setLoading, setSuccess, setError } from '../redux/msgSlice';
import app from '../firebase';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import ProductForm from './ProductForm';

const INITIAL_PRODUCT = {
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
  flag: '',
  status: '',
};

const ProductAdd = () => {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [files, setFiles] = useState<FileList>();
  const { isLoading, isSuccess, isError } = useSelector(
    (state: any) => state.msg
  );

  const dispatch = useDispatch();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const storage = getStorage(app);

    let resImages = [] as string[];

    dispatch(setLoading());

    if (files) {
      Array.from(files).map((file) => {
        const fileName =
          `${product.category}-${new Date().getTime()}-` + file.name;

        const storageRef = ref(
          storage,
          `images/${product.category}/` + fileName
        );

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          },
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                console.log(
                  "User doesn't have permission to access the object"
                );
                break;
              case 'storage/canceled':
                console.log('User canceled the upload');
                break;
              case 'storage/unknown':
                console.log(
                  'Unknown error occurred, inspect error.serverResponse'
                );
                break;
            }
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resImages.push(downloadURL);

              if (Array.from(files).length === resImages.length) {
                axios
                  .post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
                    id_product: product.id_product,
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
                    images: resImages,
                    flag: product.flag,
                    status: product.status,
                  })
                  .then(() => {
                    dispatch(setSuccess());

                    setProduct(INITIAL_PRODUCT);
                  })
                  .catch((error) => {
                    dispatch(setError());
                    console.log(error);
                  });
              }
            });
          }
        );
      });
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {isSuccess && (
        <Modal
          title="Success"
          content="Product added successfully"
          btnContent="Ok"
        />
      )}
      {isError && (
        <Modal title="Fail" content="Failed to add product" btnContent="Ok" />
      )}
      <ProductForm
        title="ADD NEW PRODUCT"
        product={product}
        submitHandler={submitHandler}
        setProduct={setProduct}
        setFiles={setFiles}
        btnContent="Add Product"
      />
    </>
  );
};

export default ProductAdd;
