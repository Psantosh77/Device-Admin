import * as React from "react";
import Box from "@mui/material/Box";
// import { utils, writeFileXLSX } from "xlsx";
import { DataGrid } from "@material-ui/data-grid";
// import jsPDF from "jspdf";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import KeyIcon from '@mui/icons-material/Key';
import { useLocation } from "react-router-dom";
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

// import Modal from '@mui/material/Modal';
import api from "../../utils/api";
import { MoreVertOutlined } from "@material-ui/icons";




const rows = [
  { id: 1, firstName: "Snow", dealerName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
  { id: 6, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
  { id: 7, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
];

export default function AllCnf() {

  const [users, setUser] = React.useState()

  console.log(users)


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const myParam = searchParams.get("id");
  
  const getAllCnf = async () => {
    const response = await api.get(`/users/parent/${myParam}`);
    setUser(response.data);
  };
  
  React.useEffect(() => {
    getAllCnf();
  }, []);

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
  }

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
      field: "viewAccounts",
      headerName: "Users",
      width: 170,
      editable: true,
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
    // {
    //   field: "view",
    //   headerName: "View",
    //   width: 180,
    //   editable: false,
    //   renderCell:(param)=>{
      
    //     return (
    //       <div>
    //         <button className="btn btn-primary" >
    //             Views 
    //         </button>
    //       </div>
    //     )
    //   }
    // },
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
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      editable: true,
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   sortable: false,
    //   renderCell: (params, index) => {
       
    //     return (
    //       <div>
    //         {/* <IconButton
    //           aria-label="more"
    //           id="long-button"
    //           aria-controls={open ? "long-menu" : undefined}
    //           aria-expanded={open ? "true" : undefined}
    //           aria-haspopup="true"
    //           onClick={handleClick}
    //         >
    //           <MoreVertIcon />
    //         </IconButton> */}

    

    //         <Menu
    //           id="long-menu"
    //           MenuListProps={{
    //             "aria-labelledby": "long-button",
    //           }}
    //           anchorEl={anchorEl}
    //           open={open}
    //           onClose={handleClose}
    //           PaperProps={{
    //             style: {
    //               maxHeight: ITEM_HEIGHT * 4.5,
    //               width: "20ch",
    //             },
    //           }}
    //         >
    //           <div
    //             style={{
    //               display: "flex",
    //               flexDirection: "column",
    //               alignItems: "flex-start",
    //             }}
    //           >
    //             <MenuItem key={"view"} onClick={ ()=>openUpdateModal (params)}>
    //               <Box m={1}>
    //                 {/* <VisibilityIcon /> */}
    //               </Box>
    //               View
    //             </MenuItem>
    //             <MenuItem key={"licence"} onClick={handleClose}>
    //               <Box m={1}>
    //                 {/* <KeyIcon /> */}
    //               </Box>
    //               Send Licence
    //             </MenuItem>
    //             <MenuItem key={"transaction"} onClick={handleClose}>
    //               <Box m={1}>
    //                 {/* <CurrencyRupeeIcon /> */}
    //               </Box>
    //               Transaction History
    //             </MenuItem>
    //           </div>
    //         </Menu>
    //       </div>
    //     );
    //   },
    // },
  ];

  // users = users.map((u) => ({ ...u, action: <MoreVertIcon /> } ));

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-9">
          <button type="button" className="btn btn-light py-2 px-3 mx-1">
            Copy
          </button>
          <button
            type="button"
            className="btn btn-light py-2 px-3 mx-1"
            // onClick={excel}
          >
            Excel
          </button>
          <button type="button" className="btn btn-light py-2 px-3 mx-1">
            CSV
          </button>
          <button
            type="button"
            className="btn btn-light py-2 px-3 mx-1"
            // onClick={pdf}
          >
            PDF
          </button>
          <button type="button" className="btn btn-light py-2 px-3 mx-1">
            Print
          </button>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-center">
          <span className="mx-1">Search:</span>
          <input
            className="form-control me-2 rounded-1 p-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          ></input>
        </div>
      </div>
      <hr />



      <Box sx={{ height: 400, width: "100%" }}>
      {
        users &&
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
        />
      }
      </Box>
    </>
  );
}
