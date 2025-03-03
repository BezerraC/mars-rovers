import React from "react";

const PlateauSettings = ({ plateau, updatePlateauDimension }) => {
  return (
    <div>
      <h2>Configuração do Planalto</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", justifyContent: "center" }}>
        <label>
          Largura:
          <input
            type="text"
            value={plateau.width}
            onChange={(e) => updatePlateauDimension("width", e.target.value)}
            style={{ marginLeft: "5px", width: "50px" }}
          />
        </label>
        <label>
          Altura:
          <input
            type="text"
            value={plateau.height}
            onChange={(e) => updatePlateauDimension("height", e.target.value)}
            style={{ marginLeft: "5px", width: "50px" }}
          />
        </label>
      </div>
    </div>
  );
};

export default PlateauSettings;