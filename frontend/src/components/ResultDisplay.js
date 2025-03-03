import React from "react";

const ResultDisplay = ({ result, error }) => {
  return (
    <>
      {error && <p style={{ color: "red", marginTop: "15px" }}>{error}</p>}
      {result && !error && (
        <div style={{ marginTop: "15px", padding: "10px", backgroundColor: "#e8f5e9", borderRadius: "4px" }}>
          <h3>Resultado</h3>
          <p>
            Nova Posição: ({result.x}, {result.y}) Direção: {result.direction}
          </p>
        </div>
      )}
    </>
  );
};

export default ResultDisplay;