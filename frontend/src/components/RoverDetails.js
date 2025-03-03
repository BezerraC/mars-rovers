import React from "react";

const RoverDetails = ({ rover, isMoving, updatePosition, updateDirection }) => {
  if (!rover) return null;

  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "5px", backgroundColor: "#f9f9f9", marginTop: "20px" }}>
      <h3>Rover {rover.id}</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <label>
          X:
          <input
            type="text"
            value={rover.x}
            onChange={(e) => updatePosition("x", e.target.value)}
            disabled={isMoving}
            style={{ marginLeft: "5px", width: "50px" }}
          />
        </label>
        <label>
          Y:
          <input
            type="text"
            value={rover.y}
            onChange={(e) => updatePosition("y", e.target.value)}
            disabled={isMoving}
            style={{ marginLeft: "5px", width: "50px" }}
          />
        </label>
        <label>
          Direção:
          <select
            value={rover.direction}
            onChange={(e) => updateDirection(e.target.value)}
            disabled={isMoving}
            style={{ marginLeft: "5px" }}
          >
            <option value="N">Norte (N)</option>
            <option value="S">Sul (S)</option>
            <option value="E">Leste (E)</option>
            <option value="W">Oeste (W)</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default RoverDetails;