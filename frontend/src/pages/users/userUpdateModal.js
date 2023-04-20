import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { SHOW_SUCCESS_NOTIFICATION , SHOW_ERROR_NOTIFICATION } from "../../utils/notification";
const UpdateUser = (props) => {
  const { uniqueData ,handleUpdateModalClose , autoupdateUser} = props;
  // console.log(uniqueData);
  const [role, setRole] = useState("");
  const [cnf, setCnf] = useState("");
  const [mDistributor, setMDistributor] = useState("");
  const [mDistributorS, setMDistributorS] = useState("");
  const [distributor, setDistributor] = useState("");

  // console.log(uniqueData);

  const [retailer, setRetailor] = useState("");

  const [masterParent_id, setMasterParent_id] = useState();

  const [formValues, setFormValues] = useState({
    id: "",
    name: "",
    role: "",
    email: "",
    mobile: "",
    business_name: "",
    address: "",
    country: "",
    state: "",
    city: "",
    password: "",
    perent_id: null,
  });

  console.log(formValues)

  useEffect(() => {
    // console.log(formValues)
    setFormValues({
      id: uniqueData.id,
      name: uniqueData?.name,
      role: uniqueData?.role,
      email: uniqueData?.email,
      mobile: uniqueData?.mobile,
      business_name: uniqueData?.business_name,
      address: uniqueData?.address,
      country: uniqueData?.country,
      state: uniqueData?.state,
      city: uniqueData?.city,
      password: uniqueData?.password,
      perent_id: uniqueData?.perent_id,
    });
    setCnf(uniqueData?.cnf);
    setRole(uniqueData?.role);
  }, [uniqueData]);

  function handleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  const handleRole = async (e) => {
    setFormValues({ ...formValues, ["role"]: e.target.value });
    setRole(e.target.value);
  };

  useEffect(() => {
    if (role !== "cnf") {
      api.get("/users/cnf").then((resp) => {
        setCnf(resp.data);
       
      });
    }
  }, []);

  const handleCnf = async (e) => {
    setMasterParent_id(e.target.value);
    setFormValues({ ...formValues, ["perent_id"]: e.target.value });
    api.get(`/users/parent/${e.target.value}`).then((resp) => {
      setMDistributor(resp.data);
    });
  };

  useEffect(()=>{
    api.get(`/users/parent/${masterParent_id}`).then((resp) => {
      setMDistributor(resp.data);
    });
  },[])

  useEffect(() => {
    console.log(uniqueData?.id);
    api.get(`/users/id/${uniqueData?.id}`).then((resp) => {
      setDistributor(resp.data);
    });
  }, [uniqueData]);

  useEffect(() => {
    distributor && api.get(`/users/id/${distributor[0]?.perent_id}`).then((resp) => {
      console.log(resp.data);
      setMDistributorS(resp.data);
    });
  }, [distributor]);

  console.log(mDistributorS[0]?.name)

  const handleMDistributor = async (e) => {
    setFormValues({ ...formValues, ["perent_id"]: e.target.value });
  };

  const handleRetailer = async (e) => {
    setFormValues({ ...formValues, ["perent_id"]: e.target.value });
    setRetailor(e.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const response = await api.put("/users", formValues);
 
    if(response.data.status){
      SHOW_SUCCESS_NOTIFICATION(response.data.msg)
      handleUpdateModalClose()
      autoupdateUser()
    }
    else{
      SHOW_ERROR_NOTIFICATION("something went wrong")
    }
  };

  return (
    <div style={{fontSize:"10px"}}>
      <div className="d-flex justify-content-between">
        <h1 className="modal-title fs-5" id="addUserLabel">
          Update User
        </h1>

        <button className="btn btn-primary">X</button>
      </div>

      <form onSubmit={submitForm}>
        <div className="modal-body row">
          <div className="mb-1 col-md-6">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="name"
              onChange={handleChange}
              value={formValues.name}
            />
          </div>
          <div className="mb-1 col-md-6">
            <label className="form-label">Role</label>
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={handleRole}
              value={formValues.role}
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
              <div className="mb-1 col-md-6">
                <label className="form-label">CNF</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleCnf}
                  value={cnf?.name}
                >
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
              <div className="mb-1 col-md-6">
                <label className="form-label">Master Distributor</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleMDistributor}
                >
                  <option selected>{mDistributorS[0]?.name}</option>;
                  {mDistributor &&
                    mDistributor.map((m) => {
                      return <option value={m.id} >{m.name}</option>;
                    })}
                </select>
              </div>
            </>
          )}

          {role === "retailer" && (
            <>
              <div className="mb-1 col-md-6">
                <label className="form-label">Distributor</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleRetailer}
                  value={distributor.name}
                >
                  {distributor &&
                    distributor.map((d) => {
                      return <option value={d.id}>{d.name}</option>;
                    })}
                </select>
              </div>
            </>
          )}
          <div className="mb-1 col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={formValues.email}
            />
          </div>
          <div className="mb-1 col-md-6">
            <label className="form-label">Mobile</label>
            <input
              type="number"
              name="mobile"
              className="form-control"
              onChange={handleChange}
              value={formValues.mobile}
            />
          </div>
          <div className="mb-1 col-md-6">
            <label className="form-label">Business Name</label>
            <input
              className="form-control"
              name="business_name"
              onChange={handleChange}
              value={formValues.business_name}
            />
          </div>
          <div className="mb-1 col-md-6">
            <label className="form-label">Address</label>
            <input
              className="form-control"
              name="address"
              onChange={handleChange}
              value={formValues.address}
            />
          </div>
          <div className="mb-1 col-md-6">
            <label className="form-label">Country</label>
            <input
              className="form-control"
              name="country"
              onChange={handleChange}
              value={formValues.country}
            />
          </div>
          <div className="mb-1 col-md-6">
            <label className="form-label">State</label>
            <input
              className="form-control"
              name="state"
              onChange={handleChange}
              value={formValues.state}
            />
          </div>
          <div className="mb-1 col-md-6">
            <label className="form-label">City</label>
            <input
              className="form-control"
              name="city"
              onChange={handleChange}
              value={formValues.city}
            />
          </div>
          <div className="mb-1 col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={formValues.password}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleUpdateModalClose}
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

export default UpdateUser;
