import React, { useEffect, useRef, useCallback } from "react";

const PlateauCanvas = ({ rovers, plateau, currentRoverIndex }) => {
  const canvasRef = useRef(null);

  // Memorizing the drawRovers function
  const drawRovers = useCallback((ctx, rovers, currentRoverIndex, cellSize, offsetX, offsetY) => {
    rovers.forEach((rover, index) => {
      const x = offsetX + parseInt(rover.x) * cellSize + cellSize / 2;
      const y = offsetY - parseInt(rover.y) * cellSize - cellSize / 2;

      // Circle for the rover
      ctx.fillStyle = rover.color;
      ctx.beginPath();
      ctx.arc(x, y, cellSize / 3, 0, Math.PI * 2);
      ctx.fill();

      // Direction arrow
      drawDirectionArrow(ctx, x, y, rover.direction, cellSize);

      // Highlights the current rover
      if (index === currentRoverIndex) {
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, cellSize / 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = parseInt(plateau.width) || 6;
    const height = parseInt(plateau.height) || 6;

    // Size of each grid cell
    const cellSize = Math.min(canvas.width / (width + 2), canvas.height / (height + 2));
    const offsetX = cellSize;
    const offsetY = canvas.height - cellSize;

    // Clean the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, width, height, cellSize, offsetX, offsetY);
    
    // Draw coordinates
    drawCoordinates(ctx, width, height, cellSize, offsetX, offsetY);
    
    // Draw rover paths
    drawRoverPaths(ctx, rovers, cellSize, offsetX, offsetY);
    
    // Draw rovers
    drawRovers(ctx, rovers, currentRoverIndex, cellSize, offsetX, offsetY);

  }, [rovers, plateau, currentRoverIndex, drawRovers]); 

  const drawGrid = (ctx, width, height, cellSize, offsetX, offsetY) => {
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;

    // Draws horizontal lines
    for (let y = 0; y <= height; y++) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY - y * cellSize);
      ctx.lineTo(offsetX + width * cellSize, offsetY - y * cellSize);
      ctx.stroke();
    }

    // Draws vertical lines
    for (let x = 0; x <= width; x++) {
      ctx.beginPath();
      ctx.moveTo(offsetX + x * cellSize, offsetY);
      ctx.lineTo(offsetX + x * cellSize, offsetY - height * cellSize);
      ctx.stroke();
    }
  };

  const drawCoordinates = (ctx, width, height, cellSize, offsetX, offsetY) => {
    ctx.fillStyle = "#000";
    ctx.font = "12px Arial";
    for (let x = 0; x <= width; x++) {
      ctx.fillText(x.toString(), offsetX + x * cellSize, offsetY + 15);
    }

    for (let y = 0; y <= height; y++) {
      ctx.fillText(y.toString(), offsetX - 15, offsetY - y * cellSize + 5);
    }
  };

  const drawRoverPaths = (ctx, rovers, cellSize, offsetX, offsetY) => {
    rovers.forEach(rover => {
      if (rover.path && rover.path.length > 1) {
        ctx.strokeStyle = rover.color;
        ctx.lineWidth = 2;
        ctx.beginPath();

        rover.path.forEach((pos, index) => {
          const x = offsetX + pos.x * cellSize + cellSize / 2;
          const y = offsetY - pos.y * cellSize - cellSize / 2;

          if (index === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        });

        ctx.stroke();
      }
    });
  };

  const drawDirectionArrow = (ctx, x, y, direction, cellSize) => {
    ctx.fillStyle = "#000";
    ctx.beginPath();

    const arrowSize = cellSize / 4;

    switch (direction) {
      case "N":
        ctx.moveTo(x, y - arrowSize);
        ctx.lineTo(x - arrowSize / 2, y);
        ctx.lineTo(x + arrowSize / 2, y);
        break;
      case "E":
        ctx.moveTo(x + arrowSize, y);
        ctx.lineTo(x, y - arrowSize / 2);
        ctx.lineTo(x, y + arrowSize / 2);
        break;
      case "S":
        ctx.moveTo(x, y + arrowSize);
        ctx.lineTo(x - arrowSize / 2, y);
        ctx.lineTo(x + arrowSize / 2, y);
        break;
      case "W":
        ctx.moveTo(x - arrowSize, y);
        ctx.lineTo(x, y - arrowSize / 2);
        ctx.lineTo(x, y + arrowSize / 2);
        break;
      default:
        console.log('Valor desconhecido');
        break;
    }

    ctx.fill();
  };

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      style={{ border: "1px solid #ccc", backgroundColor: "#f7f7f7" }}
    />
  );
};

export default PlateauCanvas;
