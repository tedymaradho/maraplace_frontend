const Setting = () => {
  return (
    <div className="setting">
      <h1 className="setting--title">SETTINGS</h1>
      <form className="setting__form">
        <div className="setting__form--group">
          <label className="setting__form--label">Id Setting</label>
          <input
            className="setting__form--input"
            type="text"
            name="id-setting"
            placeholder="Enter Id Setting"
          />
        </div>
        <div className="setting__form--group">
          <label className="setting__form--label">Set Name</label>
          <input
            className="setting__form--input"
            type="text"
            name="set-name"
            placeholder="Enter Set Name"
          />
        </div>
        <div className="setting__form--group">
          <label className="setting__form--label-file">Set 1</label>
          <div className="setting__form--file">
            <input type="file" multiple name="set1" />
            <p>You can choose multiple file</p>
          </div>
        </div>
        <div className="setting__form--group">
          <label className="setting__form--label">Set 2</label>
          <input
            className="setting__form--input"
            type="text"
            name="set2"
            placeholder="Enter Set 2"
          />
        </div>
      </form>
    </div>
  );
};

export default Setting;
