import Container from "react-bootstrap/Container";
import "../css/Listtv.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ReactPlayer from "react-player";

function Listtv({ handleclk }) {
  const vid1 = "https://youtu.be/lH1Z6e3o_3U?si=vLr2ok4whGjJYL9P";
  const [Lap1, setLap] = useState([]);
  const token = localStorage.getItem("accessToken");
  const nav = useNavigate();

  const extractlap1 = () => {
    return axios
      .get("http://localhost:3010/api/tv", {
        headers: {
          Authorization: `Bearer ${token}`, //  token in the request headers
        },
      })
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
      <div className="vid-con">
        <ReactPlayer
          key={vid1}
          url={vid1}
          playing
          loop
          muted
          controls={false}
          width="55%"
          height="320px"
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
          src="https://images.deccanherald.com/deccanherald%2Fimport%2Fsites%2Fdh%2Ffiles%2Farticle_images%2FSony%20BRAVIA%20X90L%20smart%20TV%20CS%202.jpg?w=1200"
          className="vid-add-img-tv"
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
                      className="tv-product-image"
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

export default Listtv;
