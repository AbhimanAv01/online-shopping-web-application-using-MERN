import Container from "react-bootstrap/Container";
import "../css/Listmob.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import ReactPlayer from "react-player";

function Listmob({ handleclk }) {
  const vid1 = "https://youtu.be/XHTrLYShBRQ?si=PuvFJsn3GXfG0UJW";
  const [Lap1, setLap] = useState([]);
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();

  const extractlap1 = () => {
    return axios
      .get("http://localhost:3010/api/mobile",)
      .then((res) => {
        setLap(res.data);
      })
      .catch((err) => {
        alert("please login to access this page");
        nav("/login");
      });
  };
  
  
  useEffect(() => {
    extractlap1();
  }, []);

  return (
    <div className="main-con">
      <div className="mob-vid-con">
        <ReactPlayer
          key={vid1}
          url={vid1}
          playing
          loop
          muted
          controls={false}
          width="35%"
          height="272px"
          config={{
            youtube: {
              playerVars: {
                autoplay: 1,
                loop: 1,
                quality: "highres",
                preload: "auto",
              },
            },
          }}
          style={{ pointerEvents: "none" }}
        />
        <img
          src="https://www.apple.com/v/iphone-15/c/images/overview/welcome/hero_endframe__e0ajd2ayxqc2_large.jpg"
          className="mob-vid-add-img"
        ></img>
      </div>
      <div></div>

      {Lap1.map((prod) => (
        <div className="main-div">
          <Container>
            <Card style={{ width: "80rem", height: "20rem" }} className="card">
              <Card.Body className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <Card.Img
                      variant="top"
                      src={prod.imageSrc}
                      className="mobproduct-image"
                    />
                  </div>
                  <div className="col-md-8">
                    <Card.Title>{prod.title}</Card.Title>
                    <Stack spacing={1}>
                      <Rating
                        name="size-small"
                        defaultValue={prod.star}
                        size="small"
                        className="rating"
                      />
                    </Stack>
                    <Card.Text className="price-tag">{prod.Price}</Card.Text>
                    <ul>
                      {prod.description.split("\n").map((descItem, index) => (
                        <li key={index} className="description">
                          {descItem}
                        </li>
                      ))}
                    </ul>

                    <Card.Text className="delivery">{prod.id}</Card.Text>
                    <Button
                    className="lap-add-cart-btn"
                      id="btn-addcart"
                      variant="primary"
                      onClick={() => handleclk(prod)}
                    >
                      ADD CART
                    </Button>
                  </div>
                </div>
              </Card.Body>
              <hr></hr>
            </Card>
          </Container>
        </div>
      ))}
    </div>
  );
}

export default Listmob;
