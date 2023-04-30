import React from "react";
import "fontsource-montserrat";
import {
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Paper,
} from "@mui/material";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csrfToken: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passError: false,
      passErrorMessage: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswwordChange = this.handlePasswwordChange.bind(this);
  }

  componentDidMount() {
    const csrfToken = document.querySelector('[name="csrf-token"]').content;
    this.setState({ csrfToken });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePasswwordChange(event) {
    if (event.target.value.length < this.props.pass_length) {
      this.setState({ passError: true });
      this.setState({
        passErrorMessage:
          "Password must contain " +
          this.props.pass_length +
          " or more symbols.",
      });
    } else if (!/[^0-9]/.test(event.target.value)) {
      this.setState({ passError: true });
      this.setState({
        passErrorMessage: "\nPassword must contain minimum one character.",
      });
    } else {
      this.setState({ passError: false });
      this.setState({ passErrorMessage: "" });
    }

    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.passError) {
    } else {
      // Code to submit form data goes here
      const data = {
        user: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          role: "USER",
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password,
        },
      };

      axios.post("/auth/register", data, {
        headers: {
          "X-CSRF-Token": this.state.csrfToken,
        },
      }).then(() => {
        window.location.reload(false);
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <TextField
          type="hidden"
          name="authenticity_token"
          value={this.state.csrfToken}
        />
        <Paper elevation={3} className="register-container">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            paddingBottom={10}
            fontFamily={"Montserrat"}
            fontWeight={900}
            fontSize={40}
          >
            Create an account
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="First Name"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Last Name"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
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
                  required
                  error={this.state.passError}
                  helperText={
                    this.state.passError && this.state.passErrorMessage
                  }
                  label="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handlePasswwordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                  style={{
                    height: "60px",
                    fontFamily: "Montserrat",
                    fontSize: "20px",
                    fontWeight: "800",
                  }}
                  fontFamily={"Montserrat"}
                  fontWeight={900}
                  fontSize={40}
                  onSubmit={this.handleSubmit}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          <Typography
            variant="subtitle1"
            align="center"
            marginTop={4}
            fontFamily={"Montserrat"}
            fontWeight={500}
            fontSize={20}
          >
            Already have an account? <Link href="/auth/login">Login</Link>
          </Typography>
          <style jsx="true">{`
            .register-container {
              font-family: "Montserrat", sans-serif;
              margin: 8vh auto;
              width: 60%;
              height: 60vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 6rem;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }

            .MuiTypography-h4 {
              color: #333;
            }

            form {
              width: 100%;
            }

            .MuiButton-containedPrimary {
              background-color: #0069d9;
            }

            .MuiButton-containedPrimary:hover {
              background-color: #0048a7;
            }
          `}</style>
        </Paper>
      </React.Fragment>
    );
  }
}

export default Register;
