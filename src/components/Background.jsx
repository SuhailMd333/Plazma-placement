import React, { useState, useEffect } from 'react';

const allShapes = [
  { points: "130%,-100% 97%,20% 90%,0%", color: "rgba(253, 221, 111, 0.86)" },
  { points: "-10%,25% 15%,17% 7%,50%", color: "rgba(239, 188, 7, 1)" },
  { points: "30%,-20% 45%,-20% 41%,6%", color: "rgba(53, 176, 146, 1)" },
  { points: "16%,80% -30%,85% 10%,110%", color: "rgba(248, 221, 126, 1)" },
  { points: "41%,84% 40%,90% 43%,90%", color: "rgba(203, 233, 15, 1)" },
  { points: "60%,98% 79%,90% 70%,114%", color: "rgba(53, 176, 146, 1)" },
  { points: "92%,60% 100%,55% 100%,75%", color: "rgba(247, 193, 4, 1)" },
  { points: "79%,50% 80%,40% 75%,45%", color: "rgba(219, 212, 43, 1)" },
  { points: "40%,33% 67%,25% 53%,68%", color: "rgb(6 182 212)" },
  { points: "18%,46% 27%,40% 24%,56%", color: "rgba(219, 212, 43, 0.51)" }
];

const Background = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='w-screen  h-screen  relative'>
      {allShapes.map((each, index) => (
        <TriangleSVG key={index} points={each.points} color={each.color} dimensions={dimensions} />
      ))}
    </div>
  );
};

const TriangleSVG = ({ points, color, dimensions }) => {
    
  const convertPointsToNumber = (points, width, height) => {
    const p= points.split(' ').map(point => {
      const [x, y] = point.split(',');
      const xValue = parseFloat(x) / 100 * width;
      const yValue = parseFloat(y) / 100 * height;
      return `${xValue},${yValue}`;
    }).join(' ');
     
    return p;
  };

  return (
    <svg className='absolute ' width="100%" height="100%" >
      <polygon
        points={convertPointsToNumber(points,dimensions.width,dimensions.height)}
        style={{ fill: color }}
      />
    </svg>
  );
};

export default Background;
