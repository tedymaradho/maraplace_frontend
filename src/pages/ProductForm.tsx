const ProductForm = (props: any) => {
  return (
    <div className="product-form">
      <h1 className="product-form--title">{props.title}</h1>
      <form
        encType="multipart/form-data"
        onSubmit={props.submitHandler}
        className="product-form__form"
      >
        <div className="product-form__form--left">
          <div className="product-form__form--group">
            <label className="product-form__form--label">Id Product</label>
            <input
              className="product-form__form--input"
              type="text"
              name="id-product"
              placeholder="Enter Id Product"
              value={props.product.id_product}
              onChange={(e) =>
                props.setProduct({
                  ...props.product,
                  id_product: e.target.value,
                })
              }
              disabled={props.title === 'EDIT PRODUCT' ? true : false}
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Product Name</label>
            <input
              className="product-form__form--input"
              type="text"
              name="product-name"
              placeholder="Enter Product Name"
              value={props.product.product_name}
              onChange={(e) =>
                props.setProduct({
                  ...props.product,
                  product_name: e.target.value,
                })
              }
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Merk</label>
            <input
              className="product-form__form--input"
              type="text"
              name="merk"
              placeholder="Enter Merk"
              value={props.product.merk}
              onChange={(e) =>
                props.setProduct({ ...props.product, merk: e.target.value })
              }
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Size</label>
            <input
              className="product-form__form--input"
              type="text"
              name="size"
              placeholder="Enter Size"
              value={props.product.size}
              onChange={(e) =>
                props.setProduct({ ...props.product, size: e.target.value })
              }
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Gender</label>
            <input
              className="product-form__form--input"
              type="text"
              name="gender"
              placeholder="Enter Gender"
              value={props.product.gender}
              onChange={(e) =>
                props.setProduct({ ...props.product, gender: e.target.value })
              }
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Description</label>
            <textarea
              className="product-form__form--textarea"
              name="desc"
              placeholder="Enter Description"
              rows={10}
              value={props.product.desc}
              onChange={(e) =>
                props.setProduct({ ...props.product, desc: e.target.value })
              }
            />
          </div>
        </div>

        <div className="product-form__form--right">
          <div className="product-form__form--group">
            <label className="product-form__form--label">Category</label>
            <select
              className="product-form__form--select"
              name="category"
              defaultValue=""
              onChange={(e) =>
                props.setProduct({ ...props.product, category: e.target.value })
              }
            >
              <option value="">Category</option>
              <option
                value="hat"
                selected={props.product.category === 'hat' ? true : false}
              >
                Hat
              </option>
              <option
                value="bag"
                selected={props.product.category === 'bag' ? true : false}
              >
                Bag
              </option>
              <option
                value="slippers"
                selected={props.product.category === 'slippers' ? true : false}
              >
                Slippers
              </option>
            </select>
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Price</label>
            <input
              className="product-form__form--input"
              type="number"
              name="price"
              placeholder="Enter Price"
              value={props.product.price}
              onChange={(e) =>
                props.setProduct({ ...props.product, price: +e.target.value })
              }
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Stock</label>
            <input
              className="product-form__form--input"
              type="number"
              name="stock"
              placeholder="Enter Stock"
              value={props.product.stock}
              onChange={(e) =>
                props.setProduct({ ...props.product, stock: +e.target.value })
              }
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">UoM Name</label>
            <input
              className="product-form__form--input"
              type="text"
              name="uom-name"
              placeholder="Enter UoM Name"
              value={props.product.uom_name}
              onChange={(e) =>
                props.setProduct({ ...props.product, uom_name: e.target.value })
              }
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Barcode</label>
            <input
              className="product-form__form--input"
              type="text"
              name="barcode"
              placeholder="Enter Barcode"
              value={props.product.barcode}
              onChange={(e) =>
                props.setProduct({ ...props.product, barcode: e.target.value })
              }
            />
          </div>

          {props.title === 'ADD NEW PRODUCT' && (
            <div className="product-form__form--group">
              <label className="product-form__form--label-file">Image</label>
              <div className="product-form__form--file">
                <input
                  type="file"
                  multiple
                  name="images"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={(e) =>
                    e.target.files && props.setFiles(e.target.files)
                  }
                />
                <p>You can select multiple image files</p>
              </div>
            </div>
          )}

          <div className="product-form__form--group">
            <label className="product-form__form--label">Vendor</label>
            <input
              className="product-form__form--input"
              type="text"
              name="vendor"
              placeholder="Enter Vendor"
              value={props.product.vendor}
              onChange={(e) =>
                props.setProduct({ ...props.product, vendor: e.target.value })
              }
            />
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Flag</label>
            <select
              className="product-form__form--select"
              name="flag"
              defaultValue=""
            >
              <option value="">Flag</option>
              <option
                value="recommended"
                selected={props.product.flag === 'recommended' ? true : false}
              >
                Recommended
              </option>
              <option
                value="sold"
                selected={props.product.flag === 'sold' ? true : false}
              >
                Most Sold
              </option>
            </select>
          </div>
          <div className="product-form__form--group">
            <label className="product-form__form--label">Status</label>
            <select
              className="product-form__form--select"
              name="status"
              defaultValue=""
              onChange={(e) =>
                props.setProduct({ ...props.product, status: e.target.value })
              }
            >
              <option value="">Status</option>
              <option
                value="active"
                selected={props.product.status === 'active' ? true : false}
              >
                Active
              </option>
              <option
                value="inactive"
                selected={props.product.status === 'inactive' ? true : false}
              >
                Inactive
              </option>
            </select>
          </div>
          <br />
          <div className="product-form__form--group">
            <label></label>
            <button type="submit" className="btn btn--lg btn--primary">
              {props.btnContent}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
