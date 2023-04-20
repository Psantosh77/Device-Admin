import * as React from "react";
import Box from "@mui/material/Box";
import { utils, writeFileXLSX } from "xlsx";
import { DataGrid } from "@material-ui/data-grid";
import jsPDF from "jspdf";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import KeyIcon from "@mui/icons-material/Key";
import { useLocation } from "react-router-dom";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import Modal from "@mui/material/Modal";
import api from "../../utils/api";
import { Breadcrumb } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
// import SearchableDropdown from "../../utils/searchableDropdown";

const rows = [
  { id: 1, firstName: "Snow", dealerName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
  { id: 6, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
  { id: 7, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
];

export default function UsedLicenceKey() {
  const [allRetailers, setAllRetailsers] = React.useState();
  const [retailerDetails, setRetailsersDetails] = React.useState();

  const [toDate, setToDate] = React.useState(new Date().toISOString().split("T")[0])
  const [forDate, setForDate] = React.useState(new Date().toISOString().split("T")[0])

  

  console.log(toDate, forDate)
  const [value, setValue] = React.useState("");


  console.log(retailerDetails);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const myParam = searchParams.get("id");

  console.log(myParam);

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
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "UserGreatGrandPerent",
      headerName: "CNF",
      width: 160,
      editable: true,
    },
    {
      field: "UserGrandPerent",
      headerName: "Master Distributor",
      width: 150,
      editable: true,
    },
    {
      field: "parent",
      headerName: "Distributor",
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
      field: "business_name",
      headerName: "Business Name",
      width: 150,
      editable: true,
    },
    {
      field: "name",
      headerName: "Retailer Name",
      width: 150,
      sortable: false,
      valueGetter: (params) =>
        parseInt(params.row.used_key) + parseInt(params.row.available_key),
    },
    {
      field: "email",
      headerName: "RetailerEmail",
      width: 170,
      editable: true,
    },

    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 150,
      editable: true,
    },
    {
      field: "Device",
      headerName: "Device",
      width: 180,
      editable: true,
    },
    {
      field: "updated_at",
      headerName: "Date",
      width: 180,
      editable: true,
    },
    {
      field: "Users",
      headerName: "Users",
      width: 180,
      editable: false,
      renderCell: (param) => {
        return (
          <div>
            <button className="btn btn-primary">Views</button>
          </div>
        );
      },
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
      editable: true,
    }
  ];



  console.log(value);

  const getAllRetailers = async () => {
    const response = await api.get("/allRetailers");
    setAllRetailsers(response.data.data);
  };

  React.useEffect(() => {
    getAllRetailers();
  
  }, [value]);


  const handleSubmit = ()=>{
    api
    .post("/used-key", { toDate:toDate, forDate:forDate ,  user_id: value })
    .then((response) => {
      setRetailsersDetails(response.data.data);
    })
    .catch((error) => {});
  }

  return (
    <>
      <div className="row">
      <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Used Licence Key History</Breadcrumb.Item>
          </Breadcrumb>

          <h4>Used Licence Key History</h4>
        </div>
      </div>
      <div className="row">
        <div className="card">
          <div className="card-body">
            <div className="row mt-3">
              <div className="col-md-5">
                {/* <button type="button" className="btn btn-light py-2 px-3 mx-1">
                  Copy
                </button> */}
                {/* <button
                  type="button"
                  className="btn btn-light py-2 px-3 mx-1"
                  // onClick={excel}
                >
                  Excel
                </button> */}
                {/* <button type="button" className="btn btn-light py-2 px-3 mx-1">
                  CSV
                </button> */}
                {/* <button
                  type="button"
                  className="btn btn-light py-2 px-3 mx-1"
                  // onClick={pdf}
                >
                  PDF
                </button> */}
                {/* <button type="button" className="btn btn-light py-2 px-3 mx-1">
                  Print
                </button> */}
              </div>
           
              <div className="col-md-7 d-flex align-items-center justify-content-center flex-wrap">
                <div>
                  <label>From</label>
                  <input
                    type="date"
                    className="form-control me-2 rounded-1 p-2"
                    value={toDate}
                    onChange={(e)=>setToDate(e.target.value)}
                  />
                </div>
                &nbsp;
                <div>
                  <label>To</label>
                  <input
                    type="date"
                    className="form-control me-2 rounded-1 p-2"
                    value={forDate}
                    onChange={(e)=>setForDate(e.target.value)}
                  />
                </div>
                &nbsp;
                <div>
                  <label>Retailer</label>
                  <select
                    class="form-select form-control me-2 rounded-1 p-2"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  >
                    <option selected>Choose Retailer</option>
                    {allRetailers &&
                      allRetailers?.map((item) => {
                        return <option value={item.id}>{item.email}</option>;
                      })}
                  </select>
                </div>
                &nbsp;

                <div>
                    <br/>
                  <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
                </div>

              </div>

            </div>
            <hr />

            <Box sx={{ height: 400, width: "100%" }}>
              {retailerDetails && (
                <DataGrid
                  rows={[retailerDetails]}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick
                />
              )}
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
