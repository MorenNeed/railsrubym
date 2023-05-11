import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ResponsiveAppBar from "../appBar/Index";
import axios from "axios";
import { Delete } from "@mui/icons-material";

class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      columns: [],
      updatedRows: [],
      edited: false,
      name: "",
      description: "",
      price: "",
      open: false,
    };

    this.handleEditRowModelChange = this.handleEditRowModelChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  componentDidMount() {
    const columns = [
      { field: "id", headerName: "ID", width: 90 },
      {
        field: "name",
        headerName: "Name",
        width: 150,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 150,
        editable: true,
      },
      {
        field: "price",
        headerName: "Price",
        width: 200,
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        width: 100,
        renderCell: (params) => {
          return (
            <IconButton
              onClick={() => this.handleDelete(params.row.id)}
              color={"default"}
            >
              <Delete />
            </IconButton>
          );
        },
      },
    ];
    const rows = [];
    this.props.items.forEach((item) => {
      rows.push({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
      });
    });
    this.setState({ rows: rows });
    this.setState({ columns: columns });
  }

  handleDelete(id) {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    axios({
      method: "delete",
      url: `/items/${id}`,
      data: {},
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    window.location.reload();
  }

  handleEditRowModelChange(params, event) {
    this.state.rows.map((row) => {
      if (row.id === params.row.id) {
        if (params.value != event.target.value) {
          this.setState({
            updatedRows: [
              ...this.state.updatedRows,
              {
                row: row,
                newValue: event.target.value,
                updatedField: params.field,
              },
            ],
            edited: true,
          });
        }
      }
    });
  }

  handleSaveClick() {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    this.state.updatedRows.map((row) => {
      let updatedValue = row.newValue;
      if (row.updatedField === "price") {
        const priceValue = parseFloat(row.newValue);
        if (isNaN(priceValue)) {
          alert(`Invalid price value: ${row.newValue}`);
          return;
        }
        updatedValue = priceValue;
      }
      axios({
        method: "patch",
        url: `/items/${row.row.id}`,
        data: {
          item: {
            [row.updatedField]: updatedValue,
          },
          updatedValue: updatedValue,
          updatedField: row.updatedField,
        },
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });
    });
    window.location.reload();
  }

  handleCancelClick() {
    window.location.reload();
  }

  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleAdd() {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    if (
      this.state.name.trim() === "" ||
      this.state.description.trim() === "" ||
      this.state.price.trim() === ""
    ) {
      alert("Please fill in all fields.");
      return;
    }
    axios({
      method: "post",
      url: "/items",
      data: {
        item: {
          name: this.state.name,
          description: this.state.description,
          price: parseFloat(this.state.price).toFixed(2),
        },
      },
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    }).then(() => {
      window.location.reload();
    });
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handlePriceChange(event) {
    this.setState({ price: event.target.value });
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
          <Typography color="text.primary">Products</Typography>
        </Breadcrumbs>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClickOpen}
            style={{
              marginTop: "20px",
              marginLeft: "40px",
              marginBottom: "20px",
            }}
          >
            Add Item
          </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add Item</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
                fullWidth
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                fullWidth
              />
              <TextField
                margin="dense"
                id="price"
                label="Price"
                type="number"
                value={this.state.price}
                onChange={this.handlePriceChange}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleAdd} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
        <Box sx={{ height: "fit-content", width: "100%" }}>
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
            <Button
              variant="contained"
              color="primary"
              disabled={!this.state.edited}
              onClick={this.handleSaveClick}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              disabled={!this.state.edited}
              onClick={this.handleCancelClick}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Box>
      </React.Fragment>
    );
  }
}

export default Edit;
