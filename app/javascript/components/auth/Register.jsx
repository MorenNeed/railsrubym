import React from "react";
import { TextField, Button, Grid, Typography, Link } from "@mui/material";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Code to submit form data goes here
  };

  render() {
    return (
      <React.Fragment>
        <div className="register-container">
          <Typography variant="h4" align="center" gutterBottom>
            Create an account
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  style={{ height: "50px" }}
                  fullWidth
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography variant="subtitle1" align="center">
            Already have an account?{" "}
            <Link href="/auth/login">
                Login
            </Link>
          </Typography>
        </div>
        <style jsx="true">{`
          .register-container {
            width: "100vh",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Register;
