import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import React, { useState, useEffect } from "react";

import Api from "../../utils/api";

const Referral = () => {


  const [referal, setreferral] = useState({
   
    level1: "",
    level2: "",
    level3: "",
    level4: "",
    level5: "",
    level6: "",
    level7: "",
    level8: "",
    level9: "",
  });

  const handleChange = (e) => {
    setreferral({ ...referal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = {
     
      level1: referal.level1 ?? "",
      level2: referal.level2 ?? "",
      level3: referal.level3 ?? "",
      level4: referal.level4 ?? "",
      level5: referal.level5 ?? "",
      level6: referal.level6 ?? "",
      level7: referal.level7 ?? "",
      level8: referal.level8 ?? "",
      level9: referal.level9 ?? "",
    };
    const data = await Api.post("/referral", req);
  };

  useEffect(() => {
    const response = Api.get("/referral");
    response.then((res) => {
      const data = res.data.data;
      setreferral({
       
        level1: data[0].value,
        level2: data[1].value,
        level3: data[2].value,
        level4: data[3].value,
        level5: data[4].value,
        level6: data[5].value,
        level7: data[6].value,
        level8: data[7].value,
        level9: data[8].value
      });
    });
  }, []);

  return (
    <>
     <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-1">
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
          <h4>Banner </h4>
        </div>
      </div>
      <div className="container mt-4 p-4">
      
       
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level1" class="col-form-label">
              Levels 1
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level1"
              class="form-control p-2"
              onChange={handleChange}
              name="level1"
              value={referal.level1}
            />
          </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level2" class="col-form-label">
              Levels 2
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level2"
              class="form-control p-2"
              onChange={handleChange}
              name="level2"
              value={referal.level2}
            />
          </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level3" class="col-form-label">
              Levels 3
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level3"
              class="form-control p-2"
              onChange={handleChange}
              name="level3"
              value={referal.level3}
            />
          </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level4" class="col-form-label">
              Levels 4
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level4"
              class="form-control p-2"
              onChange={handleChange}
              name="level4"
              value={referal.level4}
            />
          </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level5" class="col-form-label">
              Levels 5
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level5"
              class="form-control p-2"
              onChange={handleChange}
              name="level5"
              value={referal.level5}
            />
          </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level6" class="col-form-label">
              Levels 6
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level6"
              class="form-control p-2"
              onChange={handleChange}
              name="level6"
              value={referal.level6}
            />
          </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level7" class="col-form-label">
              Levels 7
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level7"
              class="form-control p-2"
              onChange={handleChange}
              name="level7"
              value={referal.level7}
            />
          </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level8" class="col-form-label">
              Levels 8
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level8"
              class="form-control p-2"
              onChange={handleChange}
              name="level8"
              value={referal.level8}
            />
          </div>
        </div>
        <div class="row g-3 align-items-center mb-2">
          <div class="col-md-4">
            <label for="level9" class="col-form-label">
              Levels 9
            </label>
          </div>
          <div class="col-md-4">
            <input
              type="number"
              id="level9"
              class="form-control p-2"
              onChange={handleChange}
              name="level9"
              value={referal.level9}
            />
          </div>
        </div>
        <div className="mt-3">
          <button
            type="submit"
            class="btn btn-primary col-md-3"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Referral;
