import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
// import { utils, writeFileXLSX } from "xlsx";
import { DataGrid } from "@material-ui/data-grid";
// import jsPDF from "jspdf";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import KeyIcon from "@mui/icons-material/Key";
import { useLocation } from "react-router-dom";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

// import Modal from "@mui/material/Modal";
import api from "../../utils/api";
import { SHOW_ERROR_NOTIFICATION } from "../../utils/notification";
// import SearchableDropdown from "../../utils/searchableDropdown";

const rows = [
  { id: 1, firstName: "Snow", dealerName: "Jon", age: 35 },
  { id: 1, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 1, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 1, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 1, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
  { id: 1, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
  { id: 1, lastName: "Targaryen", firstName: "Daenerys", age: 80 },
];

export default function TransferKeyHistory() {
  const [allRetailers, setAllRetailsers] = React.useState();
  const [retailerDetails, setRetailsersDetails] = React.useState();

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
      field: "business_name",
      headerName: "Business Name",
      width: 150,
      editable: true,
    },
    {
      field: "user_name",
      headerName: "User name",
      width: 150,
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
      editable: true,
    },

    {
      field: "des",
      headerName: "Description",
      width: 150,
      editable: true,
    },
    {
      field: "by_business_name",
      headerName: "Transfer Business Name",
      width: 180,
      editable: true,
    },
    {
      field: "by_name",
      headerName: "Transfer To",
      width: 180,
      editable: true,
    },
    {
      field: "by_email",
      headerName: "Transfer Email",
      width: 180,
      editable: true,
    },
    {
      field: "key",
      headerName: "Key",
      width: 180,
      editable: false,
    },
    {
      field: "type",
      headerName: "Type ",
      width: 150,
      editable: true,
    },
    {
      field: "datetime",
      headerName: "Date",
      width: 170,
      editable: true,
      renderCell: (params) => {
        return <>{params.row.datetime.slice(0, 10)}</>;
      },
    },
  ];

  const [transactions, setTrasactions] = useState("");
  const [toDate, setToDate] = useState();
  const [fromDate, setFromDate] = useState();
  const [usersAll, setUsersAll] = useState();
  const [id, setId] = useState();

  const [tableUser, setTableUser] = useState();

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  useEffect(() => {
    api.get(`/users/getall/details/andadmin`).then((response) => {
      setUsersAll(response.data);
    });

    // api
    //   .post(`/transaction-history?to=${toDate}&from=${fromDate}&id=${id}`)
    //   .then((response) => {
    //     setTrasactions(response.data.data);
    //   });
  }, []);

  const handleSearch = async () => {
    if (!toDate || !fromDate || !id) {
      SHOW_ERROR_NOTIFICATION("All feilds are required");
    } else {
      const response = await api.post(
        `/transaction-history?to=${toDate}&from=${fromDate}&id=${id}`
      );
      console.log(response.data.data);
      setTrasactions(response.data.data);
      // setTableUser(response.data.data.user)
    }
  };
  const [value, setValue] = React.useState("Select option...");

  return (
    <>
      <div className="row">
        <div class="shadow-none p-3 mb-3 bg-light rounded cnfbg">
          <a href="/dashboard">Home</a> / Licence Key History
        </div>
      </div>

      <div className="row">
        <div className="card">
          <div className="card-body">
            <div className="row mt-3">
              <div className="col-md-5">
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

              <div className="col-md-7 d-flex align-items-center justify-content-center flex-wrap">
                <div>
                  <label>From</label>
                  <input
                    type="date"
                    className="form-control me-2 rounded-1 p-2"
                    onChange={handleToDateChange}
                  />
                </div>
                &nbsp;
                <div>
                  <label>To</label>
                  <input
                    type="date"
                    className="form-control me-2 rounded-1 p-2"
                    onChange={handleFromDateChange}
                  />
                </div>
                &nbsp;
                <div>
                  <label>User</label>
                  <select
                    class="form-select form-control me-2 rounded-1 p-2"
                    aria-label="Default select example"
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  >
                    <option selected>Select User</option>
                    {usersAll &&
                      usersAll?.map((item) => {
                        return <option value={item.id}>{item.email}</option>;
                      })}
                  </select>
                </div>
                &nbsp;
                <div>
                  <br />
                  <button className="btn btn-success" onClick={handleSearch}>
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <hr />

            <Box sx={{ height: 400, width: "100%" }}>
              {transactions && (
                <DataGrid
                  rows={transactions}
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
