import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import ResponsiveAppBar from "../appBar/Index";

class Index extends React.Component {
  render() {
    const columns = [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "first_name",
        headerName: "First name",
        width: 150,
        editable: true,
      },
      {
        field: "last_name",
        headerName: "Last name",
        width: 150,
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 200,
        editable: true,
      },
      {
        field: "role",
        headerName: "Role",
        width: 150,
        editable: false,
      },
      {
        field: "actions",
        type: "actions",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<DeleteIcon/>}
            label="Delete"
            onClick={console.log(params.id)}
          />,
        ]
      },
    ];
    const rows = [];
    this.props.users.forEach((user) => {
      rows.push({
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      });
    });

    return (
      <React.Fragment>
        <ResponsiveAppBar />
        <Breadcrumbs aria-label="breadcrumb" style={{padding: "1rem"}}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Users</Typography>
        </Breadcrumbs>
        <Box sx={{ height: "80vh", width: "100%" }}>
          <DataGrid
            checkboxSelection
            columns={columns}
            rows={rows}
            isRowSelectable={(params) => params.row.role != "ADMIN"}
          />
        </Box>
      </React.Fragment>
    );
  }
}

export default Index;
