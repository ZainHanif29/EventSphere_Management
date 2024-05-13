import React from 'react';
import img0 from '/img.jpg'
import img1 from '/img-1.jpg'
import img2 from '/img-2.jpg'

function Carousel() {
  return (
    <div id="carouselExampleIndicators" className="carousel slide mb-5 " data-bs-ride="carousel">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} className="d-block w-100" alt="Slide 1" style={{height:"500px"}} />
        </div>
        <div className="carousel-item">
          <img src={img2} className="d-block w-100" alt="Slide 2" style={{height:"500px"}} />
        </div>
        <div className="carousel-item">
          <img src={img0} className="d-block w-100" alt="Slide 3" style={{height:"500px"}} />
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
