import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import ResponsiveAppBar from "../appBar/Index";

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }
  render() {
    const tables = this.props.user_orders.map((order) => {
      const columns = [
        { field: "item_id", headerName: "Item ID", width: 90 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "description", headerName: "Description", width:400},
        { field: "price", headerName: "Price", width: 90},
        { field: "quantity", headerName: "Quantity", width: 150 },
      ];
      const rows = order.order_descriptions.map((description) => {
        return {
          id: description.item_id,
          item_id: description.item_id,
          name: description.item.name,
          description: description.item.description,
          price: description.item.price,
          quantity: description.quantity,
        };
      });
      return (
        <Box key={order.id} sx={{ height: "fit-content", width: "100%" }}>
          <Typography variant="h5" style={{ padding: "1rem" }}>
            Order #{order.id}
          </Typography>
          <DataGrid columns={columns} rows={rows} />
        </Box>
      );
    });

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
          <Typography color="text.primary">My Orders</Typography>
        </Breadcrumbs>
        {tables}
      </React.Fragment>
    );
  }
}

export default Show;
