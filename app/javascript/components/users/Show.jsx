import React from "react";
import PropTypes from "prop-types";
import ResponsiveAppBar from "../appBar/Index";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      csrfToken: document.querySelector('[name="csrf-token"]').content
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleLogout() {
    axios
      .delete("/auth/signout", {
        headers: {
          "X-CSRF-Token": this.state.csrfToken,
        },
      })
      .then(() => {
        window.location.reload();
      });
  };

  handleSave() {
    axios({
      method: "patch",
      url: `/users/${this.props.current_user.id}/update_password`,
      data: {
        user: {
          current_password: this.state.password,
          password: this.state.newPassword,
          password_confirmation: this.state.newPassword,
        }
      },
      headers: {
        'X-CSRF-Token': this.state.csrfToken
      }
    }).then(() => {
      window.location.reload();
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <ResponsiveAppBar signed={this.props.signed} current_user={this.props.current_user} />
        <Box sx={{ paddingTop: "5%", height: "80vh", width: "100%" }}>
          <Paper
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
                  Email: {user.email}
                </Typography>
              </Grid>
              <Grid item sx={{ width: "100%" }}>
                <Typography variant="h6" sx={{ color: "#666" }}>
                  Current Password:
                </Typography>
                <TextField type="password" name="password" value={this.state.password} onChange={this.handleChange} fullWidth />
                <Typography variant="h6" sx={{ color: "#666" }}>
                  New password:
                </Typography>
                <TextField type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange} fullWidth />
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
                    onClick={this.handleSave}
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
                    <Link href={`/orders/${this.props.current_user.id}`}>
                      Check Orders
                    </Link>
                  </Button>
                </ButtonGroup>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  sx={{ padding: "1rem 3rem" }}
                  onClick={this.handleLogout}
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
  }).isRequired,
};

export default Show;
