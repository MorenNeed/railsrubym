import React from "react";
import PropTypes from "prop-types";
import ResponsiveAppBar from "../appBar/Index";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

class Show extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <ResponsiveAppBar />
        <Box sx={{ paddingTop: "5%", height: "80vh", width: "100%" }}>
          <Paper
            variant="outlined"
            elevation={3}
            sx={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              boxShadow: 4,
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "0 2rem",
              }}
            >
              <Avatar
                sx={{
                  height: 200,
                  width: 200,
                  bgcolor: "#f0f0f0",
                  color: "#555",
                  fontSize: "6rem",
                  marginBottom: "2rem",
                }}
              >
                {user.first_name[0] + "" + user.last_name[0]}
              </Avatar>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#555", textAlign: "center" }}
              >
                {user.first_name} {user.last_name}
              </Typography>
            </Box>
            <Grid
              style={{ padding: "0 2rem", height: "100%" }}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <Grid item sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ color: "#666" }}>
                  Email:
                </Typography>
                <TextField defaultValue={user.email} fullWidth />
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ color: "#666" }}>
                  Password:
                </Typography>
                <TextField defaultValue={user.password} fullWidth />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "2rem",
                }}
              >
                <ButtonGroup>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ padding: "1rem 3rem" }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ padding: "1rem 3rem" }}
                    style={{marginLeft: "1rem"}}
                  >
                    Check Orders
                  </Button>
                </ButtonGroup>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  sx={{ padding: "1rem 3rem" }}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </React.Fragment>
    );
  }
}

Show.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default Show;
