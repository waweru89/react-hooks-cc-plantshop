import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const { id, name, image, price } = plant;
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(price);

  const handleToggleSoldOut = () => {
    setIsSoldOut((prev) => !prev);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    setCurrentPrice(newPrice);
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => onUpdatePlant(updatedPlant));
  };

  const handleDelete = () => {
    fetch(`http://localhost:6001/plants/${id}`, { method: "DELETE" })
      .then(() => onDeletePlant(id));
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>
        Price: <input type="number" value={currentPrice} onChange={handlePriceChange} />
      </p>
      <button className="primary" onClick={handleToggleSoldOut}>
        {isSoldOut ? "Out of Stock" : "In Stock"}
      </button>
      <button className="emoji-button delete" onClick={handleDelete}>🗑</button>
    </li>
  );
}

export default PlantCard;
