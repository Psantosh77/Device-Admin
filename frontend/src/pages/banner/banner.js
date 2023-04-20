import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../utils/api";
import { SHOW_SUCCESS_NOTIFICATION } from "../../utils/notification";

const Banner = () => {
  const [file, setFile] = useState();
  const [rawFile, setRawFile] = useState();

  const [status, setStatus] = useState();
  const [position, setpostion] = useState();

  function handleChange(e) {
    setRawFile(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setFile(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = {
      image: file,
      position: position,
      status: status,
    };
    const response = await api.post(`/banner`, req)
    if(response.data.status){
      SHOW_SUCCESS_NOTIFICATION(response.data.msg)
    }
    else(
      SHOW_SUCCESS_NOTIFICATION(response.data.msg)
    )
  };

  useEffect(() => {
    const data = api.get(`/banner`);
    data.then((data) => {
      setFile(data.data.data[0].image);
      setStatus(data.data.data[0].status);
      setpostion(data.data.data[0].position);
    });
  }, []);

  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>

            <Breadcrumb.Item active>Banner</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Banner</h4>
        </div>
      </div>
      <div className="container mt-4 p-4">
        <form encType="multipart/form-data">
          <div class="mb-3">
            <label for="position" class="form-label">
              Position
            </label>
            <input
              type="email"
              class="form-control p-2"
              id="position"
              onChange={(e) => {
                setpostion(e.target.value);
              }}
              value={position}
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
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="disable">Disable</option>
            </select>
          </div>

          <label for="position" class="form-label">
            Image
          </label>
          <div class="input-group mb-3">
            <input
              type="file"
              class="form-control p-2"
              id="inputGroupFile02"
              onChange={handleChange}
            />
          </div>

          {file && <img src={file} class="img-fluid" alt="imag"></img>}

          <div className="mt-3">
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
    </>
  );
};

export default Banner;
