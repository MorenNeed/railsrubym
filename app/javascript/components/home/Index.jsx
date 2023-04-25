import { Button, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import ResponsiveAppBar from "../appBar/Index";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Index extends React.Component {
  render() {
    const sliderSettings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
    };
    return (
      <React.Fragment>
        <ResponsiveAppBar />
        <div className={"slider-container"}>
          <Slider {...sliderSettings} style={{height: "100vh"}}>
              <img
                src="https://picsum.photos/500/300"
                alt="slide1"
                className="slider-image"
              />
              <img
                src="https://picsum.photos/500/301"
                alt="slide2"
                className="slider-image"
              />
              <img
                src="https://picsum.photos/500/302"
                alt="slide3"
                className="slider-image"
              />
          </Slider>
        </div>
        <div className={"container"}>
          <Typography variant="h1" className={"heading"}>
            Welcome to our Online Store!
          </Typography>
          <Typography variant="subtitle1" className={"subheading"}>
            Check out our latest deals and promotions.
          </Typography>
          <Button variant="contained" color="primary" className={"button"}>
            Shop Now
          </Button>
        </div>
        <style jsx>{`
          .slider-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: -1;
          }
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 80vh;
            z-index: 1;
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
