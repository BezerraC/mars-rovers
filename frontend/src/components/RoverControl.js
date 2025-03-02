import React, { useState } from "react";
import axios from "axios";

const RoverControl = () => {
  const [rover, setRover] = useState({ x: "1", y: "2", direction: "N" }); 
  const [plateau, setPlateau] = useState({ width: "5", height: "5" }); 
  const [commands, setCommands] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleMoveRover = async () => {
    try {
      // Converts values ​​to numbers before sending
      const roverData = {
        x: parseInt(rover.x),
        y: parseInt(rover.y),
        direction: rover.direction,
      };
      const plateauData = {
        width: parseInt(plateau.width),
        height: parseInt(plateau.height),
      };

      const response = await axios.post("http://localhost:5256/rover/move", {
        rover: roverData,
        plateau: plateauData,
        commands,
      });
      setResult(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao mover o rover.");
      setResult(null);
    }
  };

  return (
    <div>
      <h1>Controle de Rovers em Marte</h1>
      <div>
        <h2>Configuração do Rover</h2>
        <label>
          Posição X:
          <input
            type="text" 
            value={rover.x}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setRover({ ...rover, x: value });
              }
            }}
          />
        </label>
        <label>
          Posição Y:
          <input
            type="text" 
            value={rover.y}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setRover({ ...rover, y: value });
              }
            }}
          />
        </label>
        <label>
          Direção:
          <select
            value={rover.direction}
            onChange={(e) => setRover({ ...rover, direction: e.target.value })}
          >
            <option value="N">Norte (N)</option>
            <option value="S">Sul (S)</option>
            <option value="E">Leste (E)</option>
            <option value="W">Oeste (W)</option>
          </select>
        </label>
      </div>
      <div>
        <h2>Configuração do Planalto</h2>
        <label>
          Largura:
          <input
            type="text" 
            value={plateau.width}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPlateau({ ...plateau, width: value });
              }
            }}
          />
        </label>
        <label>
          Altura:
          <input
            type="text" 
            value={plateau.height}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value)) {
                setPlateau({ ...plateau, height: value });
              }
            }}
          />
        </label>
      </div>
      <div>
        <h2>Comandos</h2>
        <label>
          Comandos (L, R, M):
          <input
            type="text"
            value={commands}
            onChange={(e) => setCommands(e.target.value.toUpperCase())}
          />
        </label>
      </div>
      <button onClick={handleMoveRover}>Mover Rover</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {result && (
        <div>
          <h2>Resultado</h2>
          <p>
            Nova Posição: ({result.x}, {result.y}) Direção: {result.direction}
          </p>
        </div>
      )}
    </div>
  );
};

export default RoverControl;