import { Close } from "@material-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { SHOW_ERROR_NOTIFICATION, SHOW_SUCCESS_NOTIFICATION } from "../../utils/notification";

const PackageModel = (props) => {
  const { singleUpdate, handleCloseModel , autoupdatePackage , checkAddClick } = props;
  const [status, setStatus] = useState();

  const [packageData, setPackageData] = useState({
    id: "",
    title: "",
    price: "",
    mpp: "",
    desc: "",
  });

  const [updateStatus, setIpdateStatus] = useState(false);

  function handleChange(e) {
    setPackageData({ ...packageData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    console.log("click");
    e.preventDefault();

    if(packageData.title === "" || packageData.price === "" || packageData.mpp === "" || packageData.desc === " " || status === ""  ){
      return SHOW_ERROR_NOTIFICATION("All fields are required")
    }

    const req = {
      title: packageData.title,
      price: packageData.price,
      mpp: packageData.mpp,
      desc: packageData.desc,
      status: status,
    };

    const updateReq = {
      id: singleUpdate?.id,
      title: packageData.title ?? singleUpdate?.title,
      price: packageData.price ?? singleUpdate?.price,
      mpp: packageData.mpp ?? singleUpdate?.mpp,
      desc: packageData.desc ?? singleUpdate?.desc,
      status: status ?? singleUpdate?.status,
    };

    if (singleUpdate) {
      console.log(singleUpdate?.length);
      const data = await api.put("/packages", updateReq);
      if (data.data.status) {
        autoupdatePackage()
        handleCloseModel();
        SHOW_SUCCESS_NOTIFICATION(data.data.message)
      }
    } else {
      const data = await api.post("/packages", req)
      if (data.data.status) {
        autoupdatePackage()
        handleCloseModel();
        SHOW_SUCCESS_NOTIFICATION(data.data.message)
      }

    }
  };

  useEffect(() => {
    if(checkAddClick){
      setPackageData({
        id: "",
        title: "",
        price:"",
        mpp: "",
        desc: "",
      });
      setStatus("");
    }else{
    setPackageData({
      id: singleUpdate?.id,
      title: singleUpdate?.title,
      price: singleUpdate?.price,
      mpp: singleUpdate?.mpp,
      desc: singleUpdate?.description,
    });
    setStatus(singleUpdate?.status)
  }
  }, [singleUpdate, updateStatus , checkAddClick]);

  return (
    <div className="container mt-4 p-4">
      <div className="d-flex justify-content-between align-items-center">
      {
        singleUpdate  ? 
        <h3>Package </h3>
        :<h3>Package</h3>
      }
        <Close onClick={()=> handleCloseModel()}/>
      </div>
      <form encType="multipart/form-data">
        <div class="mb-3">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            class="form-control p-2"
            id="title"
            name="title"
            onChange={handleChange}
            value={packageData.title}
          />
        </div>

        <div class="mb-3">
          <label for="title" class="form-label">
            Price
          </label>
          <input
            type="number"
            class="form-control p-2"
            id="title"
            name="price"
            onChange={handleChange}
            value={packageData.price}
          />
        </div>

        <div class="mb-3">
          <label for="title" class="form-label">
            MRP
          </label>
          <input
            type="number"
            class="form-control p-2"
            id="title"
            name="mpp"
            onChange={handleChange}
            value={packageData.mpp}
          />
        </div>

        <div class="mb-3">
          <label for="title" class="form-label">
            Description
          </label>
          <input
            type="text"
            class="form-control p-2"
            id="title"
            name="desc"
            onChange={handleChange}
            value={packageData.desc}
          />
        </div>

        <div class="mb-3">
          <label for="position" class="form-label">
            Status
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            value={status}
          >
            <option selected></option>
            <option value="enable">Enable</option>
            <option value="disable">Disable</option>
          </select>
        </div>

        <div className="mt-3 d-flex justify-content-end">
          <button
            type="submit"
            class="btn btn-primary col-md-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageModel;
