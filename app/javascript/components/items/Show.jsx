import React from "react";
import PropTypes from "prop-types";
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
      quantity: 0,
    };

    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }).isRequired,
  };

  handleQuantityChange(event) {
    this.setState({ quantity: event.target.value });
  }

  handleClick() {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...items, {id: this.props.item.id, name: this.props.item.name, price: this.props.item.price, quantity: this.state.quantity}]));
  }

  render() {
    const { item } = this.props;

    return (
      <>
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
                <Button variant="contained" size="large" onClick={this.handleClick}>Add to Cart</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export default Show;
