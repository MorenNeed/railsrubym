import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  IconButton,
  Link,
  Typography,
} from "@mui/material";
import ResponsiveAppBar from "../appBar/Index";
import axios from "axios";
import { Delete } from "@mui/icons-material";

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [],
      updatedRows: [],
      edited: false,
    };

    this.handleEditRowModelChange = this.handleEditRowModelChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  componentDidMount() {
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
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 100,
        renderCell: (params) => {
          return (
            <IconButton
              onClick={() => this.handleDelete(params.row.id)}
              color={'default'}
              disabled={params.row.role === "ADMIN"}
            >
              <Delete />
            </IconButton>
          );
        },
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
    this.setState({ rows: rows });
    this.setState({ columns: columns })
  }

  handleDelete(id) {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    axios({
      method: "delete",
      url: `/users/${id}`,
      data: {
      },
      headers: {
        'X-CSRF-Token': csrfToken
      }
    });

    window.location.reload();
  }

  handleEditRowModelChange(params, event) {
    this.state.rows.map((row) => {
      if(row.id === params.row.id) {
        if(params.value != event.target.value) {
          this.setState({updatedRows: [...this.state.updatedRows, {row: row, newValue: event.target.value, updatedField:  params.field}], edited: true});
        }
      }
    });
  }

  handleSaveClick() {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    this.state.updatedRows.map((row) => {
      axios({
        method: "patch",
        url: `/users/${row.row.id}`,
        data: {
          user: {
            [row.updatedField]: row.newValue
          },
          updatedValue: row.newValue,
          updatedField: row.updatedField,
        },
        headers: {
          'X-CSRF-Token': csrfToken
        }
      });
    })
    window.location.reload();
  }

  handleCancelClick() {
    window.location.reload();
  }

  render() {
    return (
      <React.Fragment>
        <ResponsiveAppBar
          signed={this.props.signed}
          current_user={this.props.current_user}
        />
        <Breadcrumbs aria-label="breadcrumb" style={{ padding: "1rem" }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Users</Typography>
        </Breadcrumbs>
        <Box sx={{ height: "70vh", width: "100%" }}>
          <DataGrid
            columns={this.state.columns}
            rows={this.state.rows}
            onCellEditStop={this.handleEditRowModelChange}
          />
        </Box>
        <Box>
          <ButtonGroup
            size="large"
            style={{ paddingTop: "40px", paddingLeft: "40px" }}
          >
            <Button variant="contained" color="primary" disabled={!this.state.edited} onClick={this.handleSaveClick}>
              Save
            </Button>
            <Button variant="outlined" disabled={!this.state.edited} onClick={this.handleCancelClick}>
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </React.Fragment>
    );
  }
}

export default Index;
