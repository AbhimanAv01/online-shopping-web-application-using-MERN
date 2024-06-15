import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import "../css/Sildes.css";
import slideimage2 from'../images/iphone.jpg'

import { GrFormPrevious,GrFormNext } from "react-icons/gr";

export default function App() {
  return (
    <div className="carousel-container">
      <Carousel
        prevIcon={<GrFormPrevious size={60} />} // Use custom icon for previous button
        nextIcon={<GrFormNext size={60} />} // Use custom icon for next button
      >
        <Carousel.Item interval={2500}>
          <img
            className="d-block w-100"
            src="https://dlcdnwebimgs.asus.com/gain/E4098B55-053D-466E-A75B-1A8676829D31/fwebp"
            alt="Image One"
          />
          <Carousel.Caption>
            {/* <h3>Label for first slide</h3>
            <p>Sample Text for Image One</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <img
            className="d-block w-100"
            src="https://dlcdnwebimgs.asus.com/gain/53A7196B-1583-4296-95ED-9AF75185657F/fwebp"
            alt="Image Two" 
          />
          <Carousel.Caption>
            {/* <h3>Label for second slide</h3>
            <p>Sample Text for Image Two</p> */}
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <img
            className="d-block w-100"
            src="https://dlcdnwebimgs.asus.com/gain/97570A51-4436-485A-AC5A-7D27F4316D96/fwebp"
            alt="Image Two"
          />
          <Carousel.Caption>
            {/* <h3>Label for second slide</h3>
            <p>Sample Text for Image Two</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
