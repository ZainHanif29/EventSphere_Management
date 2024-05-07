import React from 'react';

function CardList() {
  // Assuming img variable contains the image source URL
  const img = '/img.jpg';

  // Array of card content
  const cardContent = Array.from({ length: 20 }, (_, index) => (
    <div key={index} className="col-md-4 mb-3"> {/* Using Bootstrap's grid system */}
      <div className="card">
        <img src={img} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container">
        <div className="row">
      {cardContent}
    </div>
    </div>
  );
}

export default CardList;
