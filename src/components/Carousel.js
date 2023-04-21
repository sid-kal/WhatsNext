import React from "react";
import logo1 from "./logo1.png";
import logo2 from "./logo2.png";
import light from "./light.png";
import moment from "moment";

export default function Carousel({events, special, theme}) {
  const images = [logo1, logo2, light];

    const style={backgroundColor: "#001e3c"};
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
      style={style}
      
    >
      <div className="carousel-inner" >
        
        {events.map((image, index) => (
            <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            style={{color: theme?"white":""}}
            >
            Alert! We have a major event as follows:
            {special[index] && 
            <>
            <h1>{image.title}</h1>
            <h2>{image.description}</h2>
            <h2>{moment(image.startTime).format("h:mm a, Do MMMM, YYYY")}</h2>
            <h2>{moment(image.endTime).format("h:mm a, Do MMMM, YYYY")}</h2>
            <h2>{image.likes}</h2>
            </>
            }
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
