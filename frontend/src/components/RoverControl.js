import React, { useState } from "react";
import PlateauCanvas from "../components/PlateauCanvas";
import PlateauSettings from "../components/PlateauSettings";
import RoversList from "../components/RoversList";
import RoverDetails from "../components/RoverDetails";
import CommandPanel from "../components/CommandPanel";
import ResultDisplay from "../components/ResultDisplay";

const RoverControl = () => {
  const [rovers, setRovers] = useState([
    { id: 1, x: "1", y: "2", direction: "N", color: getRandomColor(), path: [] }
  ]);
  const [plateau, setPlateau] = useState({ width: "6", height: "6" });
  const [commands, setCommands] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [currentRoverIndex, setCurrentRoverIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [movementInterval, setMovementInterval] = useState(500);

  // Generates a random color for each rover
  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Add a new rover to the list
  const addRover = () => {
    const newRover = {
      id: rovers.length + 1,
      x: "0",
      y: "0",
      direction: "N",
      color: getRandomColor(),
      path: []
    };
    setRovers([...rovers, newRover]);
    setCurrentRoverIndex(rovers.length);
  };

  // Process the commands one by one for real-time visualization
  const processCommandsSequentially = async () => {
    if (!commands) return;

    setIsMoving(true);
    setError("");
    const currentRover = { ...rovers[currentRoverIndex] };

    // Initializes the path with the current position
    if (!currentRover.path || currentRover.path.length === 0) {
      currentRover.path = [{ x: parseInt(currentRover.x), y: parseInt(currentRover.y) }];
    }

    // Process each command
    for (let i = 0; i < commands.length; i++) {
      const singleCommand = commands[i];

      try {
        const roverData = {
          x: parseInt(currentRover.x),
          y: parseInt(currentRover.y),
          direction: currentRover.direction,
        };

        const plateauData = {
          width: parseInt(plateau.width),
          height: parseInt(plateau.height),
        };

        const response = await fetch("http://localhost:5256/rover/move", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rover: roverData,
            plateau: plateauData,
            commands: singleCommand,
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao mover o rover.");
        }

        const data = await response.json();

        // Update the rover position
        currentRover.x = data.x.toString();
        currentRover.y = data.y.toString();
        currentRover.direction = data.direction;

        // Add new position to the path only if there is movement
        if (singleCommand === "M") {
          currentRover.path.push({
            x: parseInt(currentRover.x),
            y: parseInt(currentRover.y)
          });
        }

        // Add the rover to the list
        const updatedRovers = [...rovers];
        updatedRovers[currentRoverIndex] = currentRover;
        setRovers(updatedRovers);

        // Wait before the next movement for visualization
        await new Promise(resolve => setTimeout(resolve, movementInterval));

      } catch (err) {
        setError(err.message || "Erro ao mover o rover.");
        break;
      }
    }

    setResult({
      x: currentRover.x,
      y: currentRover.y,
      direction: currentRover.direction
    });

    setIsMoving(false);
  };

  const updateRoverPosition = (key, value) => {
    if (/^\d*$/.test(value)) {
      const updatedRovers = [...rovers];
      updatedRovers[currentRoverIndex] = {
        ...updatedRovers[currentRoverIndex],
        [key]: value,
        path: [] // Resets the path when changing the position
      };
      setRovers(updatedRovers);
    }
  };

  const updateRoverDirection = (value) => {
    const updatedRovers = [...rovers];
    updatedRovers[currentRoverIndex] = {
      ...updatedRovers[currentRoverIndex],
      direction: value
    };
    setRovers(updatedRovers);
  };

  const updatePlateauDimension = (dimension, value) => {
    if (/^\d*$/.test(value)) {
      setPlateau({ ...plateau, [dimension]: value });
    }
  };

  return (
    <div className="rover-container" style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Controle de Rovers em Marte</h1>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ flex: "1" }}>
          <h2>Visualização do Planalto</h2>
          <PlateauCanvas 
            rovers={rovers} 
            plateau={plateau} 
            currentRoverIndex={currentRoverIndex} 
          />

          <PlateauSettings 
            plateau={plateau}
            updatePlateauDimension={updatePlateauDimension}
          />
        </div>

        <div style={{ flex: "1" }}>
          <RoversList 
            rovers={rovers}
            currentRoverIndex={currentRoverIndex}
            setCurrentRoverIndex={setCurrentRoverIndex}
            addRover={addRover}
            isMoving={isMoving}
          />

          <RoverDetails 
            rover={rovers[currentRoverIndex]}
            isMoving={isMoving}
            updatePosition={updateRoverPosition}
            updateDirection={updateRoverDirection}
          />

          <CommandPanel 
            commands={commands}
            setCommands={setCommands}
            movementInterval={movementInterval}
            setMovementInterval={setMovementInterval}
            processCommands={processCommandsSequentially}
            isMoving={isMoving}
          />

          <ResultDisplay result={result} error={error} />
        </div>
      </div>
    </div>
  );
};

export default RoverControl;