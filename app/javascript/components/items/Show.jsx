import React from "react";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  TextField,
} from "@mui/material";
import ResponsiveAppBar from "../appBar/Index";

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      quantity: 0,
    };

    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleQuantityChange(event) {
    this.setState({ quantity: event.target.value });
  }

  handleClick() {
    const { item } = this.props;
    const { quantity } = this.state;

    if (quantity <= 0 || isNaN(quantity)) {
      alert("Wrong quantity!");
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index] = {
        ...updatedCartItems[index],
        quantity:
          parseInt(updatedCartItems[index].quantity, 10).toFixed(2) +
          parseInt(quantity, 10).toFixed(2),
      };

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    } else {
      const newItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity,
      };
      localStorage.setItem("cart", JSON.stringify([...cartItems, newItem]));
    }

    alert("Item added to cart!");
    this.setState({ quantity: 1 });
    window.location.reload();
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        <ResponsiveAppBar
          signed={this.props.signed}
          current_user={this.props.current_user}
        />
        <Box sx={{ padding: 3 }}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/items">
              Products
            </Link>
            <Typography color="text.primary">{item.name}</Typography>
          </Breadcrumbs>
          <Box sx={{ marginBottom: 5 }}>
            <Typography variant="h4" component="h1">
              {item.name}
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ maxWidth: 600 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="400"
                    image={`https://picsum.photos/seed/${item.name}/200/300/`}
                    alt={item.name}
                  />
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <CardContent sx={{ marginBottom: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Name: {item.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  Description: {item.description}
                </Typography>
                <Typography variant="h6" color="primary">
                  Price: {item.price} UAH
                </Typography>
              </CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: 1 }}>
                  Quantity:
                </Typography>
                <TextField
                  type="number"
                  value={this.state.quantity}
                  onChange={this.handleQuantityChange}
                  sx={{ marginBottom: 2, width: "10%", padding: "0 auto" }}
                />
                <Button
                  variant="contained"
                  size="large"
                  onClick={this.handleClick}
                >
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Show;
