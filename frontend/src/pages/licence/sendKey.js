import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
// import {
//   SHOW_ERROR_NOTIFICATION,
//   SHOW_SUCCESS_NOTIFICATION,
// } from "../../utils/notification";
// import SearchableDropdown from "../../utils/searchableDropdown";

const SendLicence = () => {
  const [users, setUsers] = useState("");
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const [_byID, set_IdBy] = useState("");

  const [mode, setMode] = useState("");
  const [licenceKey, setlicenceKey] = useState("");
  const [description, setdescription] = useState("");

  useEffect(() => {
    api.get("/users/getall/details").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  const [value, setValue] = React.useState("Select option...");

  const handleUser = (e) => {
    const value = JSON.parse(e.target.value);
    set_IdBy(value.id);
    setName(value.name);
    setAddress(value.address);
    setShop(value.business_name);
    setMobile(value.mobile);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(users);

  const handleSubmit = async (e) => {
    const req = {
      user_id: user.id,
      _by: _byID,
      des: description,
      type: mode,
      key: licenceKey,
    };
    const response = await api.post("/transaction", req);
    console.log(response);
    if (response.status) {
      //   SHOW_SUCCESS_NOTIFICATION(response.data.msg);
    } else {
      //   SHOW_ERROR_NOTIFICATION(response.data.msg);
    }
  };

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
            <Breadcrumb.Item active>Send Licence key</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Send Licence Key</h4>
        </div>
      </div>

      <div className="container mt-4 p-4">
        <div class="card w-75">
          <div class="card-header">Send Licence</div>
          <div class="card-body">
            <div className="row">
              <div className="mb-3 col-md-8 row">
                <label className="form-label col-md-4">Email</label>
                <select
                  class="form-select col"
                  aria-label="Default select example"
                  onChange={handleUser}
                >
                  <option selected></option>
                  {users &&
                    users.map((u) => {
                      return (
                        <option value={JSON.stringify(u)}>{u.email}</option>
                      );
                    })}
                </select>

                {/* {users && (
                <div  class="col">
                  <SearchableDropdown
                    options={users}
                    label="email"
                    id="id"
                    selectedVal={value}
                    handleChange={(val) => setValue(val)}
                  />
                </div>
              )} */}
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-8 row">
                <label className="form-label col-md-4 mt-1">Name</label>
                <input
                  name="name"
                  className="form-control col"
                  value={name}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-8 row">
                <label className="form-label col-md-4 mt-1">Shop Name</label>
                <input
                  name="shop_name"
                  className="form-control col"
                  value={shop}
                  disabled
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-8 row">
                <label className="form-label col-md-4 mt-1">Mobile</label>
                <input
                  type="number"
                  name="mobile"
                  className="form-control col"
                  disabled
                  value={mobile}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-8 row">
                <label className="form-label col-md-4 mt-1">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control col"
                  disabled
                  value={address}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-8 row">
                <label className="form-label col-md-4">Mode</label>
                <select
                  class="form-select col"
                  aria-label="Default select example"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option selected>Choose Mode</option>
                  <option value={"Debit"}>Debit</option>;
                  <option value={"Credit"}>Credit</option>;
                </select>
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-8 row">
                <label className="form-label col-md-4 mt-1">
                  Licence Quantity
                </label>
                <input
                  type="number"
                  name="licence_quantity"
                  className="form-control col"
                  onChange={(e) => setlicenceKey(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="mb-3 col-md-8 row">
                <label className="form-label col-md-4 mt-1">Description</label>
                <textarea
                  name="description"
                  className="form-control col"
                  onChange={(e) => setdescription(e.target.value)}
                />
              </div>
            </div>
            <button class="btn btn-primary" onClick={handleSubmit}>
              Proceed
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendLicence;
