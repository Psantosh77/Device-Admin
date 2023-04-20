import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";

import { PageTrafficTable, RankingTable } from "../../components/Tables";
import { useState } from "react";
import { useEffect } from "react";

import Datatable from "./Datatable"
import api from "../../utils/api";
import UserAdd from "./addUser";

import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default () => {

  const [users, setUsers] = useState("");
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchClick, setSearchClick] = useState(false);

  const [updateUser, setUpdateUser] = useState(false)
  const autoupdateUser = () =>{
    setUpdateUser(!updateUser)
  }

  const handleSearchStatus = () => {
    setSearchClick(!searchClick)
  }

  useEffect(() => {
    getUsers();
  }, [searchClick, updateUser]);

  const getUsers = async () => {
    const response = await api.get(`/users/distributer?serach=${searchQuery}`);
    setUsers(response.data);
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
            <Breadcrumb.Item active>Distributor</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Distributor</h4>
        </div>
      </div>

      {users.length &&
        <Datatable autoupdateUser={autoupdateUser} users={users}  handleOpenAdd={handleOpenAdd} setSearchQuery={setSearchQuery} searchQuery={searchQuery} handleSearchStatus={handleSearchStatus} role={"distributer"}/>
      }

      
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <UserAdd  handleCloseAdd={handleCloseAdd}/>
        </Box>
      </Modal>

    </>
  );
};