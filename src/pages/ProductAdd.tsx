import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { setLoading, setSuccess, setError, setHidden } from '../redux/msgSlice';
import app from '../firebase';
import Modal from '../components/Modal';
import Loading from '../components/Loading';

const INITIAL_PRODUCT = {
  idProduct: '',
  productName: '',
  merk: '',
  size: '',
  gender: '',
  desc: '',
  category: '',
  price: 0,
  stock: 0,
  uomName: '',
  images: [] as File[],
  vendor: '',
  status: '',
};

const ProductAdd = () => {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [files, setFiles] = useState<FileList>();
  const [resetSelect, setResetSelect] = useState<boolean>(false);
  const { isLoading, isSuccess, isError } = useSelector(
    (state: any) => state.msg
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addHandler = async (e: React.FormEvent) => {
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
                    id_product: product.idProduct,
                    product_name: product.productName,
                    merk: product.merk,
                    size: product.size,
                    gender: product.gender,
                    desc: product.desc,
                    category: product.category,
                    price: +product.price,
                    sale_price: +product.price,
                    stock: +product.stock,
                    uom_name: product.uomName,
                    images: resImages,
                    status: product.status,
                  })
                  .then(() => {
                    dispatch(setSuccess());

                    setProduct(INITIAL_PRODUCT);
                    setResetSelect(true);

                    navigate('/product/add');
                  })
                  .catch((error) => console.log(error));
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
          content="Added new product success"
          btnContent="Ok"
        />
      )}
      <div className="add-product">
        <h1 className="add-product--title">ADD NEW PRODUCT</h1>
        <form
          encType="multipart/form-data"
          onSubmit={addHandler}
          className="add-product__form"
        >
          <div className="add-product__form--left">
            <div className="add-product__form--group">
              <label className="add-product__form--label">Id Product</label>
              <input
                className="add-product__form--input"
                type="text"
                name="id-product"
                placeholder="Enter Id Product"
                value={product.idProduct}
                onChange={(e) =>
                  setProduct({ ...product, idProduct: e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Product Name</label>
              <input
                className="add-product__form--input"
                type="text"
                name="product-name"
                placeholder="Enter Product Name"
                value={product.productName}
                onChange={(e) =>
                  setProduct({ ...product, productName: e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Merk</label>
              <input
                className="add-product__form--input"
                type="text"
                name="merk"
                placeholder="Enter Merk"
                value={product.merk}
                onChange={(e) =>
                  setProduct({ ...product, merk: e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Size</label>
              <input
                className="add-product__form--input"
                type="text"
                name="size"
                placeholder="Enter Size"
                value={product.size}
                onChange={(e) =>
                  setProduct({ ...product, size: e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Gender</label>
              <input
                className="add-product__form--input"
                type="text"
                name="gender"
                placeholder="Enter Gender"
                value={product.gender}
                onChange={(e) =>
                  setProduct({ ...product, gender: e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Description</label>
              <textarea
                className="add-product__form--textarea"
                name="desc"
                placeholder="Enter Description"
                rows={12}
                value={product.desc}
                onChange={(e) =>
                  setProduct({ ...product, desc: e.target.value })
                }
              />
            </div>
          </div>

          <div className="add-product__form--right">
            <div className="add-product__form--group">
              <label className="add-product__form--label">Category</label>
              <select
                className="add-product__form--select"
                name="category"
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              >
                <option>Category</option>
                <option value="hat">Hat</option>
                <option value="bag">Bag</option>
                <option value="slippers">Slippers</option>
              </select>
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Price</label>
              <input
                className="add-product__form--input"
                type="number"
                name="price"
                placeholder="Enter Price"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: +e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Stock</label>
              <input
                className="add-product__form--input"
                type="number"
                name="stock"
                placeholder="Enter Stock"
                value={product.stock}
                onChange={(e) =>
                  setProduct({ ...product, stock: +e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">UoM Name</label>
              <input
                className="add-product__form--input"
                type="text"
                name="uom-name"
                placeholder="Enter UoM Name"
                value={product.uomName}
                onChange={(e) =>
                  setProduct({ ...product, uomName: e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label-file">Image</label>
              <div className="add-product__form--file">
                <input
                  type="file"
                  multiple
                  name="images"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) => e.target.files && setFiles(e.target.files)}
                />
                <p>You can select multiple image files</p>
              </div>
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Vendor</label>
              <input
                className="add-product__form--input"
                type="text"
                name="vendor"
                placeholder="Enter Vendor"
                value={product.vendor}
                onChange={(e) =>
                  setProduct({ ...product, vendor: e.target.value })
                }
              />
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Flag</label>
              <select className="add-product__form--select" name="flag">
                <option>Flag</option>
                <option value="recommended">Recommended</option>
                <option value="sold">Most Sold</option>
              </select>
            </div>
            <div className="add-product__form--group">
              <label className="add-product__form--label">Status</label>
              <select
                className="add-product__form--select"
                name="status"
                onChange={(e) =>
                  setProduct({ ...product, status: e.target.value })
                }
              >
                <option>Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <br />
            <div className="add-product__form--group">
              <label></label>
              <button type="submit" className="btn btn--lg btn--primary">
                Add Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductAdd;
