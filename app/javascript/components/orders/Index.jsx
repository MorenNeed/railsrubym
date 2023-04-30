import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import ResponsiveAppBar from "../appBar/Index";

function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

class Index extends React.Component {

  render() {
    const ordersByUser = groupBy(this.props.orders, (order) => order.user_id);

    const tablesByUser = [...ordersByUser.entries()].map(
      ([userId, orders]) => {
        const tables = orders.map((order) => {
          const columns = [
            { field: "item_id", headerName: "Item ID", width: 90 },
            { field: "name", headerName: "Name", width: 150 },
            { field: "description", headerName: "Description", width: 400 },
            { field: "price", headerName: "Price", width: 90 },
            { field: "quantity", headerName: "Quantity", width: 70 },
            { field: "total", headerName: "Total", width: 90 }
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
              <DataGrid columns={columns} rows={rows} />
            </Box>
          );
        });

        return (
          <Box key={userId}>
            <Typography variant="h5" style={{ padding: "1rem" }}>
              User {userId}
            </Typography>
            {tables}
          </Box>
        );
      }
    );

    return (
      <React.Fragment>
        <ResponsiveAppBar
          signed={this.props.signed}
          current_user={this.props.current_user}
        />
        <Box sx={{ padding: "1rem" }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">All Orders</Typography>
          </Breadcrumbs>
        </Box>
        {tablesByUser}
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  orders: PropTypes.array.isRequired,
  signed: PropTypes.bool.isRequired,
  current_user: PropTypes.object.isRequired,
};

export default Index;
