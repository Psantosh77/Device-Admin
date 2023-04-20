import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Notification, { SHOW_ERROR_NOTIFICATION, SHOW_SUCCESS_NOTIFICATION } from "../../utils/notification";
const UserAdd = ({handleCloseAdd , autoupdateUser}) => {
  const [role, setRole] = useState("");
  const [cnf, setCnf] = useState("");
  const [mDistributor, setMDistributor] = useState("");
  const [distributor, setDistributor] = useState("");
  const [retailer, setRetailor] = useState("");
  const [parentId, setParentId] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    role: "",
    email: "",
    mobile: null,
    business_name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    password: "",
    perent_id: null,
  });

  console.log(formValues);

  useEffect(() => {
    api.get("/countries").then((resp) => {
      setCountry(resp.data);
    });
  }, []);

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  const countryChange = async (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: JSON.parse(e.target.value).name,
    });
    const resp = await api.get(`/state/${JSON.parse(e.target.value).id}`);
    setState(resp.data);
  };

  const stateChange = async (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: JSON.parse(e.target.value).name,
    });
    const resp = await api.get(`/city/${JSON.parse(e.target.value).id}`);
    setCity(resp.data);
  };

  const cityChange = async (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: JSON.parse(e.target.value).name,
    });
  };

  const handleRole = async (e) => {
    setFormValues({ ...formValues, ["role"]: e.target.value });

    setRole(e.target.value);
    if (e.target.value !== "cnf") {
      const resp = await api.get("/users/cnf");
      setCnf(resp.data);
      return;
    }
  };

  const handleCnf = async (e) => {
    setFormValues({ ...formValues, ["perent_id"]: e.target.value });

    const resp = await api.get(`/users/parent/${e.target.value}`);
    setMDistributor(resp.data);
  };

  const handleMDistributor = async (e) => {
    console.log(e.target.value);
    setFormValues({ ...formValues, ["perent_id"]: e.target.value });

    const resp = await api.get(`/users/parent/${e.target.value}`);
    console.log(resp)
    setDistributor(resp.data);
  };

  const handleRetailer = async (e) => {
    setFormValues({ ...formValues, ["perent_id"]: e.target.value });

    setRetailor(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users", formValues);
      console.log(response.data);

      if(response.data.status){
            handleCloseAdd();
            SHOW_SUCCESS_NOTIFICATION(response.data.msg)
            autoupdateUser()
          }
      return response.data;
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data);
        SHOW_ERROR_NOTIFICATION(error.response.data.msg)
      } else if (error.request) {
        // console.log(error.request);
      } else {
        // console.log("Error", error.message);
      }
      // console.log(error);
    }
  
    
    // try{
    //   const response = await api.post("/users", formValues)
    //   console.log("data",response)
    //   if(response.data.status){
    //     handleCloseAdd();
    //     SHOW_SUCCESS_NOTIFICATION(response.data.msg)
    //   }
    //   else{
    //     console.log(response.data.status)
    //     SHOW_SUCCESS_NOTIFICATION("hello")
    //   }
    // }
    // catch(e){

    // }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="modal-body row">
        <h4>Add</h4>
          <div className="mb-3 col-md-6">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Role</label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={handleRole}
            >
              <option selected>Choose Role</option>
              <option value="cnf">CNF</option>
              <option value="master_distributer">Master Distributor</option>
              <option value="distributer">Distributor</option>
              <option value="retailer">Retailer</option>
            </select>
          </div>

          {(role === "master_distributer" ||
            role === "distributer" ||
            role === "retailer") && (
            <>
              <div className="mb-3 col-md-6">
                <label className="form-label">CNF</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleCnf}
                >
                  <option selected>Choose CNF</option>
                  {cnf &&
                    cnf.map((c) => {
                      return (
                        <>
                          <option value={c.id}>{c.name}</option>
                        </>
                      );
                    })}
                </select>
              </div>
            </>
          )}

          {(role === "distributer" || role === "retailer") && (
            <>
              <div className="mb-3 col-md-6">
                <label className="form-label">Master Distributor</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleMDistributor}
                >
                  <option selected>Choose Master Distributor</option>
                  {mDistributor &&
                    mDistributor.map((m) => {
                      return <option value={m.id}>{m.name}</option>;
                    })}
                </select>
              </div>
            </>
          )}

          {role === "retailer" && (
            <>
              <div className="mb-3 col-md-6">
                <label className="form-label">Distributor</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleRetailer}
                >
                  <option selected>Choose Distributor</option>
                  {distributor &&
                    distributor.map((d) => {
                      return <option value={d.id}>{d.name}</option>;
                    })}
                </select>
              </div>
            </>
          )}
          <div className="mb-3 col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Mobile</label>
            <input
              type="number"
              name="mobile"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Business Name</label>
            <input
              className="form-control"
              name="business_name"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              name="address"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Country</label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="country"
              onChange={countryChange}
            >
              <option selected>Choose Country</option>
              {country &&
                country.map((c) => {
                  return (
                    <option value={JSON.stringify({ id: c.id, name: c.name })}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">State</label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="state"
              onChange={stateChange}
            >
              <option selected>Choose State</option>
              {state &&
                state.map((c) => {
                  return (
                    <option value={JSON.stringify({ id: c.id, name: c.name })}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">City</label>
            <select
              class="form-select"
              aria-label="Default select example"
              name="city"
              onChange={cityChange}
            >
              <option selected>Choose City</option>
              {city &&
                city.map((c) => {
                  return (
                    <option value={JSON.stringify({ id: c.id, name: c.name })}>
                      {c.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={()=>handleCloseAdd()}

          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAdd;
