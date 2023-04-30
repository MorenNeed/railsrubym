import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Breadcrumbs, Button, Link, Typography } from "@mui/material";
import ResponsiveAppBar from "../appBar/Index";
import axios from "axios";

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(order) {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;

    axios({
      method: "delete",
      url: `/orders/${order.id}`,
      headers: {
        "X-CSRF-Token": csrfToken,
      },
    });

    window.location.reload();
  }

  render() {
    const tables = this.props.user_orders.map((order) => {
      const columns = [
        { field: "item_id", headerName: "Item ID", width: 90 },
        { field: "name", headerName: "Name", width: 150 },
        { field: "description", headerName: "Description", width:400},
        { field: "price", headerName: "Price", width: 90},
        { field: "quantity", headerName: "Quantity", width: 70 },
        { field: "total", headerName: "Total", width: 90}
      ];
      const rows = order.order_descriptions.map((description) => {
        return {
          id: description.item_id,
          item_id: description.item_id,
          name: description.item.name,
          description: description.item.description,
          price: description.item.price,
          quantity: description.quantity,
          total: description.item.price * description.quantity,
        };
      });
      return (
        <Box key={order.id} sx={{ height: "fit-content", width: "100%" }}>
          <Typography variant="h5" style={{ padding: "1rem" }}>
            Order #{order.id}
          </Typography>
          <Typography variant="h6" style={{ padding: ".5rem"}}>
            Amount of items: {order.amount}
          </Typography>
          <DataGrid columns={columns} rows={rows} />
          <Button color="error" variant="outlined" style={{marginTop: "10px", marginLeft: "5px"}} onClick={() => this.handleDelete(order)}>
            Delete Order #{order.id}
          </Button>
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
