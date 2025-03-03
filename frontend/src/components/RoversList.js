import React from "react";

const RoversList = ({ rovers, currentRoverIndex, setCurrentRoverIndex, addRover, isMoving }) => {
  return (
    <div>
      <h2>Rovers</h2>
      <div style={{ marginBottom: "15px" }}>
        <button onClick={addRover} disabled={isMoving} style={{ margin: "0px" }}>
          Adicionar Rover
        </button>
        
        {rovers.length > 1 && (
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <label>Rover Ativo:</label>
            <select
              value={currentRoverIndex}
              onChange={(e) => setCurrentRoverIndex(parseInt(e.target.value))}
              disabled={isMoving}
            >
              {rovers.map((r, index) => (
                <option key={r.id} value={index}>
                  Rover {index + 1} ({r.x}, {r.y}, {r.direction})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoversList;