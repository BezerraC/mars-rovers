import React from "react";

const CommandPanel = ({ 
  commands, 
  setCommands, 
  movementInterval, 
  setMovementInterval, 
  processCommands, 
  isMoving 
}) => {
  const handleCommandChange = (e) => {
    const value = e.target.value.toUpperCase();
    if (/^[LRM]*$/.test(value)) {
      setCommands(value);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Comandos</h2>
      <div style={{ marginBottom: "15px" }}>
        <label>
          Comandos (L, R, M):
          <input
            type="text"
            value={commands}
            onChange={handleCommandChange}
            disabled={isMoving}
            style={{ marginLeft: "5px", width: "200px" }}
          />
        </label>
        <div style={{ marginTop: "10px" }}>
          <label>
            Velocidade de movimento:
            <select
              value={movementInterval}
              onChange={(e) => setMovementInterval(parseInt(e.target.value))}
              disabled={isMoving}
              style={{ marginLeft: "5px" }}
            >
              <option value={1000}>Lento (1s)</option>
              <option value={500}>Médio (0.5s)</option>
              <option value={200}>Rápido (0.2s)</option>
            </select>
          </label>
        </div>
      </div>
      <button
        onClick={processCommands}
        disabled={isMoving}
        style={{
          padding: "8px 16px",
          backgroundColor: isMoving ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isMoving ? "not-allowed" : "pointer"
        }}
      >
        {isMoving ? "Movendo..." : "Mover Rover"}
      </button>
    </div>
  );
};

export default CommandPanel;