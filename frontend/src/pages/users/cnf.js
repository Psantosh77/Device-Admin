import React from "react";

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

  const [updateUser, setUpdateUser] = useState(false)
  const autoupdateUser = () =>{
    setUpdateUser(!updateUser)
  }

  const [searchQuery, setSearchQuery] = useState("");
  const [searchClick, setSearchClick] = useState(false);

  const handleSearchStatus = () => {
    setSearchClick(!searchClick)
    if(!searchQuery.length > 0) {
      setSearchQuery("")
    }
  }

  useEffect(() => {
    getUsers();
  }, [searchClick , updateUser]);

  const getUsers = async () => {
    if(searchQuery.length > 0) {
      const response = await api.get(`/users/cnf?serach=${searchQuery}`);
      setUsers(response.data);
    }
    else{
      const response = await api.get(`/users/cnf?serach=${""}`);
      setUsers(response.data);
    }

    // const response = await api.get(`/users/cnf`);  
  };


  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
         
          <h4>CNF</h4>
        </div>
      </div>

      {users && <Datatable autoupdateUser={autoupdateUser} users={users}  handleOpenAdd={handleOpenAdd} setSearchQuery={setSearchQuery} searchQuery={searchQuery} handleSearchStatus={handleSearchStatus} role={"cnf"}/>}

      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <UserAdd  handleCloseAdd={handleCloseAdd} autoupdateUser={autoupdateUser}/>
        </Box>
      </Modal>

    </>
  );
};
