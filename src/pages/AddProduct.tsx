const AddProduct = () => {
  return (
    <div className="add-product">
      <h1 className="add-product--title">ADD NEW PRODUCT</h1>
      <form className="add-product__form">
        <div className="add-product__form--left">
          <div className="add-product__form--group">
            <label className="add-product__form--label">Id Product</label>
            <input
              className="add-product__form--input"
              type="text"
              name="id-product"
              placeholder="Enter Id Product"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Product Name</label>
            <input
              className="add-product__form--input"
              type="text"
              name="product-name"
              placeholder="Enter Product Name"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Merk</label>
            <input
              className="add-product__form--input"
              type="text"
              name="merk"
              placeholder="Enter Merk"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Size</label>
            <input
              className="add-product__form--input"
              type="text"
              name="size"
              placeholder="Enter Size"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Gender</label>
            <input
              className="add-product__form--input"
              type="text"
              name="gender"
              placeholder="Enter Gender"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Description</label>
            <textarea
              className="add-product__form--textarea"
              name="desc"
              placeholder="Enter Description"
              rows={12}
            />
          </div>
        </div>

        <div className="add-product__form--right">
          <div className="add-product__form--group">
            <label className="add-product__form--label">Category</label>
            <select className="add-product__form--select" name="category">
              <option>Category</option>
            </select>
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Price</label>
            <input
              className="add-product__form--input"
              type="number"
              name="price"
              placeholder="Enter Price"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Stock</label>
            <input
              className="add-product__form--input"
              type="number"
              name="stock"
              placeholder="Enter Stock"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Unit Name</label>
            <input
              className="add-product__form--input"
              type="text"
              name="unit-name"
              placeholder="Enter Unit Name"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label-file">Image Url</label>
            <div className="add-product__form--file">
              <input type="file" multiple name="image-url" />
              <p>You can choose multiple file</p>
            </div>
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Vendor</label>
            <input
              className="add-product__form--input"
              type="text"
              name="vendor"
              placeholder="Enter Vendor"
            />
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Flag</label>
            <select className="add-product__form--select" name="flag">
              <option>Flag</option>
            </select>
          </div>
          <div className="add-product__form--group">
            <label className="add-product__form--label">Status</label>
            <select className="add-product__form--select" name="status">
              <option>Status</option>
            </select>
          </div>
          <br />
          <div className="add-product__form--group">
            <label></label>
            <button className="btn btn--lg btn--primary">Add Product</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
