import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import React, { useEffect } from "react";
import { useState } from "react";

import api from "../../utils/api";
import PackageModel from "./packageModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Edit } from "@material-ui/icons";
import { SHOW_SUCCESS_NOTIFICATION } from "../../utils/notification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 1,
};

const Package = () => {
  const [packahedata, setPackageData] = useState();
  const [singleUpdate, setSingleUpdate] = useState();

  const [checkAddClick , setAddClick] = useState(false)


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => (setOpen(true), setAddClick(true));
  const handleClose = () => setOpen(false);

  const [updatePackage, setUpdatePackage] = useState(false)
  const autoupdatePackage = () =>{
    setUpdatePackage(!updatePackage)
  }

  useEffect(() => {
    (async () => {
      const data = await api.get("/packages");
      setPackageData(data.data.data);
    })();
  }, [updatePackage]);

  const handleupdate = (item) => {
    setAddClick(false)
    setSingleUpdate(item);
    setOpen(true);
  };
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

            <Breadcrumb.Item active>Package</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Package</h4>
        </div>
      </div>

      <div className="container mt-4 p-1">
        <div class="d-flex justify-content-end ">
          <button class="btn btn-primary" onClick={handleOpen}>
            Add Package
          </button>
        </div>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">MRP</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {packahedata?.map((items, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{items.title}</td>
                  <td>{items.price}</td>
                  <td>{items.mpp}</td>
                  <td>{items.description}</td>
                  <td>{items.status}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => handleupdate(items)}
                    >
                      <Edit/> Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {open && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <PackageModel
                singleUpdate={singleUpdate}
                handleCloseModel={handleClose}
                autoupdatePackage={autoupdatePackage}
                checkAddClick={checkAddClick}
              />
            </Box>
          </Modal>
        )}
      </div>
    </>
  );
};

export default Package;
