import React from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Link,
  Breadcrumbs,
} from "@mui/material";
import ResponsiveAppBar from "../appBar/Index";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchBy: "name",
      items: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchBy = this.handleSearchBy.bind(this);
  }
  handleSearch(event) {
    this.setState({ searchTerm: event.target.value });
  }

  handleSearchBy(event) {
    this.setState({ searchBy: event.target.value });
  }

  componentDidMount() {
    this.setState({ items: this.props.items });
  }
  render() {
    const { searchTerm, items, searchBy } = this.state;

    const filteredItems = items.filter((item) =>
      item[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        <ResponsiveAppBar
          signed={this.props.signed}
          current_user={this.props.current_user}
        />
        <Box
          sx={{ backgroundColor: "#f0f0f0", padding: 3, minHeight: "100vh" }}
        >
          <Box sx={{ marginBottom: 4 }}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography color="text.primary">Products</Typography>
            </Breadcrumbs>
            <Typography variant="h4" component="h1">
              Products
            </Typography>
          </Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                label="Search items"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={this.handleSearch}
                sx={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                fullWidth
                value={searchBy}
                onChange={this.handleSearchBy}
                select
                SelectProps={{ native: true }}
                sx={{
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                  width: "30%",
                }}
              >
                <option value="name">Name</option>
                <option value="description">Description</option>
                <option value="price">Price</option>
              </TextField>
            </Grid>
          </Grid>
          {filteredItems.length > 0 ? (
            <Grid container spacing={2} sx={{ marginTop: 3 }}>
              {filteredItems.map((item) => (
                <Grid item xs={12} md={4} key={item.id}>
                  <Card
                    sx={{
                      border: "1px solid #ccc",
                      "&:hover": { boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)" },
                    }}
                  >
                    <Link href={`/items/${item.id}`} style={{textDecoration: "none"}}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="200"
                          image={`https://picsum.photos/seed/${item.name}/200/300/`}
                          alt={item.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                              fontSize: "1.25rem",
                              paddingLeft: "10px",
                              marginBottom: "10px",
                            }}
                          >
                            Name: {item.name}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              paddingLeft: "20px",
                              overflow: "hidden",
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 4,
                              textOverflow: "ellipsis",
                              maxHeight: "100px",
                            }}
                          >
                            Description: {item.description}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="primary"
                            sx={{
                              backgroundColor: "#f3f3f3",
                              paddingLeft: "10px",
                              borderRadius: "10px",
                              marginTop: "20px",
                            }}
                          >
                            Price: {item.price} UAH
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ marginTop: 3 }} variant="h6" component="div">
              No items found.
            </Typography>
          )}
        </Box>
      </>
    );
  }
}

export default Index;
