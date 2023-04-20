import * as React from "react";
import Box from "@mui/material/Box";
import { utils, writeFileXLSX } from "xlsx";
import { DataGrid, useGridState } from "@material-ui/data-grid";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyIcon from "@mui/icons-material/Key";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
// import UpdateUser from "./users/updateUserModal";
import { useHistory } from "react-router-dom";
import api from "../../utils/api";
// import { Edit } from "@mui/icons-material";
import { SHOW_SUCCESS_NOTIFICATION , SHOW_ERROR_NOTIFICATION } from "../../utils/notification";
import { Edit, Search } from "@material-ui/icons";
import UpdateUser from "./userUpdateModal";
import { useState, useRef, useEffect } from "react";
import { useGridRowSelection } from "@mui/x-data-grid/internals";
import { More } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function DataGridDemo({
  users,
  handleOpenAdd,
  searchQuery,
  setSearchQuery,
  handleSearchStatus,
  role,
  autoupdateUser
}) {
  const history = useHistory();

  const [updateModelOpen, setUpdateModelOpen] = React.useState(false);
  const handleUpdateModalOpen = () => setUpdateModelOpen(true);
  const handleUpdateModalClose = () => setUpdateModelOpen(false);

  const [uniqueData, setUnqueData] = React.useState();

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openUpdateModal = (data) => {
    handleClose();
    setUnqueData(data.row);
    setUpdateModelOpen(true);
  };

  const handeView = (param) => {
    console.log(param.row.perent_id);
    history.push(`/cnf/all-cnf/?id=${param.row.perent_id}`);
  };

  const handleChangeStatus = async (e, id) => {
    if (e.target.checked === true) {
      const response = await api.post("/updateStatus", {
        id: id,
        status: "Active",
      });
      console.log(response.data[0]);
        SHOW_SUCCESS_NOTIFICATION("Sucessfully updated")
        autoupdateUser()
    } else {
      const response = await api.post("/updateStatus", {
        id: id,
        status: "Inactive",
      });
      console.log(response.data[0]);
        SHOW_SUCCESS_NOTIFICATION("Sucessfully updated")
        autoupdateUser()
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "role",
      headerName: "Dealer name",
      width: 160,
      editable: true,
    },
    {
      field: "name",
      headerName: "User name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "User Email",
      width: 150,
      editable: true,
    },
    {
      field: "available_key",
      headerName: "Available Key",
      width: 170,
      editable: true,
    },
    {
      field: "used_key",
      headerName: "Use Key",
      width: 150,
      editable: true,
    },
    {
      field: "totalKey",
      headerName: "Total Key",
      width: 150,
      sortable: false,
      valueGetter: (params) =>
        parseInt(params.row.used_key) + parseInt(params.row.available_key),
    },

    {
      field: "mobile",
      headerName: "Contact",
      width: 150,
      editable: true,
    },
    {
      field: "business_name",
      headerName: "Business Name",
      width: 180,
      editable: true,
    },

    {
      field: "country",
      headerName: "Country",
      width: 150,
      editable: true,
    },
    {
      field: "admin_app_version",
      headerName: "App Version",
      width: 170,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      renderCell: (params, index) => {
        const status = params.row.status;
        return (
          <>
            {status === "Processing" ? (
              <div className="d-flex justify-content-between align-items-center w-100">
                <p>{status}</p>

                <div class="form-check form-switch">
                  <input
                    style={{ color: "red" }}
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    defaultChecked={status === "Active" ? true : false}
                    onChange={(e) => handleChangeStatus(e, params.row.id)}
                  />
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center w-100">
                <p>{status}</p>

                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    defaultChecked={status === "Active" ? true : false}
                    onChange={(e) => handleChangeStatus(e, params.row.id)}
                  />
                </div>
              </div>
            )}
          </>
        );
      },
    },
    {
      field: "role",
      headerName: "Type",
      width: 150,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      sortable: false,
      renderCell: (params, index) => {
        return (
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <More/>
            </IconButton>

            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "20ch",
                },
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <MenuItem key={"view"} onClick={() => openUpdateModal(params)}>
                  <Box m={1}>
                    <Edit />
                  </Box>
                  Update
                </MenuItem>

                <MenuItem key={"view"} onClick={() => handeView(params)}>
                  <Box m={1}><VisibilityIcon /></Box>
                  View
                </MenuItem>
                <MenuItem key={"licence"} onClick={handleClose}>
                  <Box m={1}><KeyIcon /></Box>
                  Send Licence
                </MenuItem>
                <MenuItem key={"transaction"} onClick={handleClose}>
                  <Box m={1}><CurrencyRupeeIcon /></Box>
                  Transaction History
                </MenuItem>
              </div>
            </Menu>
          </div>
        );
      },
    },
    {
      field: "Users",
      headerName: "users",
      width: 180,
      editable: false,
      renderCell: (param) => {
        return (
          <div>
            <button
              className="btn btn-primary"
              onClick={() => handeView(param)}
            >
              view
            </button>
          </div>
        );
      },
    },
  ];

  // users = users.map((u) => ({ ...u, action: <h6>f</h6> }));

  function excel() {
    const newData = users.map(row=>{
      delete row.googleId
      delete row.perent_id
      delete row.referral_email
      delete row.sponser
      delete row.currency
      delete row.pic
      delete row.password
      delete row.qr_code
      delete row.aadhar_card
      delete row.pan_card
      delete row.pin_value
      delete row.token
      delete row.referral_id
      delete row.created_at
      delete row.updated_at 
      delete row.action 

      return row
    })
    const wb = utils.book_new();
    utils.book_append_sheet(wb, utils.json_to_sheet(users));
    writeFileXLSX(wb, "excel.xlsx");
  }

  const pdf = () => {
    const doc = new jsPDF();
    doc.text("Details", 20, 10);
    doc.autoTable({
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
        body: users,
    });
    doc.save("data.pdf");
  };

  //fiterer
  console.log(searchQuery);
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const [tableData, setTableData] = useState(users);
  const [searchText, setSearchText] = useState("");

  console.log(users);
  const requestSearch = () => {
    const filteredRows = users.filter((item) => {
      console.log(item.name);
      item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    console.log(filteredRows);
    setTableData(filteredRows);
  };

  React.useEffect(() => {
    requestSearch();
  }, [searchText]);

  const cancelSearch = () => {
    setSearchText("");
    requestSearch(searchText);
  };

  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  const [fiterData, setFiterData] = useState();

  const dropdownRef = useRef(null);


  useEffect(() => {
    getUsers();
  }, []);

  const [list, setList] = useState();

  const getUsers = async () => {
    setList()
      const response = await api.get(`/users/${role}`);
      setList(response.data);
    // const response = await api.get(`/users/cnf`);
  };



  // click away listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClicks, false);
    return () => document.removeEventListener("mousedown", handleClicks, false);
  }, []);

  const searchFilter = (searchValue, list, searchBy ) => {
    let lowerCaseQuery = searchValue.toLowerCase();
    let filteredList = searchValue
      ? list.filter((x) => x[searchBy].toLowerCase().includes(lowerCaseQuery))
      : list;
      setFiterData(filteredList)
    return filteredList;
  };


  const handleClicks = (e) => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (!visible) {
      setVisible(true);
    }
    searchFilter(e.target.value, list ,  "name" )
  };
  
  const selectItem = (item) => {
    setSearchQuery(item.name)
    setSearchValue(item.name);
    setSelectedItem(item.id);
    setVisible(false);
  };

  const selectChange = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-5">
          {/* <button type="button" className="btn btn-light py-2 px-3 mx-1">
            Copy
          </button> */}
          <button
            type="button"
            className="btn btn-light py-2 px-3 mx-1"
            onClick={excel}
          >
            Excel
          </button>
          {/* <button type="button" className="btn btn-light py-2 px-3 mx-1">
            CSV
          </button> */}
          <button
            type="button"
            className="btn btn-light py-2 px-3 mx-1"
            onClick={pdf}
          >
            PDF
          </button>
          {/* <button type="button" className="btn btn-light py-2 px-3 mx-1" onClick={window.print}>
            Print
          </button> */}
        </div>

        {/* <div className="col-md-7 d-flex align-items-center justify-content-center"> */}
        <div className="d-flex flex-row flex-wrap col-md-7 justify-content-end ">
          {/* <div>
              <label>From</label>
              <input type="date" className="form-control me-2 rounded-1 p-2" />
            </div>
            &nbsp;
            <div>
              <label>To</label>
              <input type="date" className="form-control me-2 rounded-1 p-2" />
            </div> */}
          &nbsp;
          <div>
            <div className="container">
              <div
                tabIndex="0"
                className="input_container"
                style={{ position: "relative" }}
              >
                <input
                  className="form-control me-2 rounded-1 p-2 "
                  type="text"
                  placeholder="Search Text"
                  value={searchValue}
                  onChange={handleChange}
                  onFocus={() => {
                    // if (searchValue) {
                    setVisible(true);
                    // };
                  }}
                />
                <Search
                 onClick={()=>handleSearchStatus()}
                  style={{ position: "absolute", top: 10, right: 15 }}
                />
              </div>
              <div
                ref={dropdownRef}
                className={`dropdown ${visible ? "v" : ""}`}
              >
                {visible && (
                  <ul
                    className="position-absolute bg-white text-dark w-100"
                    style={{ zIndex: 99, listStyleType: "none" }}
                  >
                    {!list && (
                      <li key="zxc" className="dropdown_item">
                        no result
                      </li>
                    )}
                    {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
                    {list && searchValue &&
                      fiterData.map((x) => (
                        <li
                          key={x.id}
                          onClick={() => (selectItem(x))}
                          className="dropdown_item"
                        >
                          <div className="item_text1">{x.name}</div>
                          
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
          &nbsp;
          <button className=" btn btn-primary" onClick={() => handleOpenAdd()}>
            Add user
          </button>
        </div>
        {/* </div> */}
      </div>
      <hr />
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      </Box>

      <Modal
        open={updateModelOpen}
        onClose={handleUpdateModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <UpdateUser
              uniqueData={uniqueData}
              handleUpdateModalClose={handleUpdateModalClose}
              autoupdateUser={autoupdateUser}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
}
