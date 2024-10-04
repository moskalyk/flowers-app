import { useEffect, useRef } from 'react';
import './App.css'; // Import the CSS file for centering

const RandomPatternCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = 500;
    const height = canvas.height = 500;
    const centerX = width / 2;
    const centerY = height / 2;

    const getRandom = (min: any, max: any) => Math.floor(Math.random() * (max - min + 1)) + min;

    const getRandomColor = () => {
      const r = getRandom(0, 255);
      const g = getRandom(0, 255);
      const b = getRandom(0, 255);
      return `rgb(${r},${g},${b})`;
    };

    const drawFlowerPattern = (numPetals: any, radius: any, lineWidth: any) => {
      const angleStep = (2 * Math.PI) / numPetals;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = getRandomColor();
      ctx.fillStyle = getRandomColor();

      ctx.beginPath();
      for (let i = 0; i < numPetals; i++) {
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const drawPolygon = (sides: any, radius: any, lineWidth: any) => {
      const angleStep = (2 * Math.PI) / sides;
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = getRandomColor();
      ctx.fillStyle = getRandomColor();

      ctx.beginPath();
      for (let i = 0; i <= sides; i++) {
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const drawSpirograph = (innerRadius: any, outerRadius: any, turns: any) => {
      ctx.beginPath();
      ctx.strokeStyle = getRandomColor();
      ctx.fillStyle = getRandomColor();

      let started = false;

      for (let i = 78; i < 360 * turns; i++) {
        const angle = i * (Math.PI / 180);
        const r = innerRadius + (outerRadius - innerRadius) * ((360 * turns - i) / (360 * turns));

        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    };

    const randomDraw = () => {
      ctx.clearRect(0, 0, width, height);

      const flowerCount = getRandom(1, 3);
      const polygonCount = getRandom(1, 3);
      const spirographCount = getRandom(0, 1);

      for (let i = 0; i < flowerCount; i++) {
        drawFlowerPattern(getRandom(5, 20), getRandom(50, 250), getRandom(1, 3));
      }

      for (let i = 0; i < polygonCount; i++) {
        drawPolygon(getRandom(3, 10), getRandom(50, 200), getRandom(1, 3));
      }

      for (let i = 0; i < spirographCount; i++) {
        drawSpirograph(getRandom(20, 50), getRandom(100, 200), getRandom(5, 10));
      }
    };

    randomDraw();
  }, []);

  return <canvas ref={canvasRef} width={500} height={500} />;
};

function App() {
  return (
    <>
      <RandomPatternCanvas />
    </>
  );
}

export default App;
