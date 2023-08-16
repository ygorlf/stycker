import { useRef } from 'react';
import { Layer, Line } from 'react-konva';

interface ViewRect {
  x1: number;
  y1: number;
  x2: number;
  y2: number
}

interface GridProps {
  viewRect: ViewRect;
  gridFullRect: ViewRect;
  stepSize: number;
  scale: number;
}

const Grid = ({
  gridFullRect,
  stepSize,
  scale
} : GridProps) => {
  const layerRef = useRef(null);

  const drawLines = () => {
    if (!layerRef.current) return;

    const fullRect = gridFullRect;

    const
      xSize = (fullRect.x2 - fullRect.x1),
      ySize = (fullRect.y2 - fullRect.y1),
      xSteps = Math.round(xSize / stepSize),
      ySteps = Math.round(ySize / stepSize);

    const lines = [];

    // vertical lines
    for (let i = 0; i <= xSteps; i++) {
      lines.push(
        <Line
          key={`v${i}`}
          x={fullRect.x1 + i * stepSize}
          y={fullRect.y1}
          points={[0, 0, 0, ySize]}
          stroke='rgba(0, 0, 0, 0.3)'
          strokeWidth={0.5 / scale}
        />
      );
    }

    // horizontal lines
    for (let i = 0; i <= ySteps; i++) {
      lines.push(
        <Line
          key={`h${i}`}
          x={fullRect.x1}
          y={fullRect.y1 + i * stepSize}
          points={[0, 0, xSize, 0]}
          stroke='rgba(0, 0, 0, 0.3)'
          strokeWidth={0.5 / scale}
        />
      );
    }

    return lines;
  };

  return (
    <Layer
      ref={layerRef}
      // clipFunc={(ctx) => {
      //   ctx.rect(viewRect.x1, viewRect.y1, viewRect.x2 - viewRect.x1, viewRect.y2 - viewRect.y1);
      // }}
    >
      {drawLines()}
    </Layer>
  );
}

export default Grid;