import { Link, Typography } from "@mui/material";
import React from "react";
import ResponsiveAppBar from "../appBar/Index";

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <ResponsiveAppBar
          signed={this.props.signed}
          current_user={this.props.current_user}
        />
        <div className={"container"}>
          <Typography variant="h1" className={"heading"}>
            Welcome to our Online Store!
          </Typography>
          <Typography variant="subtitle1" className={"subheading"}>
            Check out our latest deals and promotions.
          </Typography>
          <Link
            href="/items"
            underline="none"
            color="#fff"
            bgcolor="text.primary"
            variant="contained"
            className={"button"}
          >
            Shop Now
          </Link>
        </div>
        <style jsx="true">{`
          .slider-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
            height: 100vh;
          }
          .container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            z-index: 2;
          }
          .heading {
            font-size: 5rem;
            color: #333;
            margin-bottom: 2rem;
            text-align: center;
            text-shadow: 1px 1px #ccc;
          }
          .subheading {
            font-size: 2rem;
            color: #666;
            margin-bottom: 2rem;
            text-align: center;
          }
          .button {
            font-size: 1.5rem;
            border-radius: 2rem;
            padding: 1rem 2rem;
            box-shadow: 2px 2px #ccc;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
          }
          .button:hover {
            transform: translateY(-5px);
            box-shadow: 4px 4px #ccc;
          }
          .slider-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

export default Index;
