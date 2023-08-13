import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { getStroke } from 'perfect-freehand';
import { nanoid } from 'nanoid';

import { useStore } from '../../models/root';

const getSvgPathFromStroke = (stroke: number[][]) => {
  if (!stroke.length) return '';

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ['M', ...stroke[0], 'Q']
  )

  d.push('Z')
  return d.join(' ');
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`;

const options = {
  size: 12,
  thinning: 0.5,
  smoothing: 0.5,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true
  },
  end: {
    taper: 100,
    easing: (t) => t,
    cap: true
  }
};

const DrawLayer = observer(() => {
  const [isDrawing, setDrawing] = useState(false);
  const [points, setPoints] = useState<number[][]>([]);

  const { boardStore, stickersStore } = useStore();

  const handleNewDraw = (path: string) => {
    const { x, y } = boardStore.boardBounds;

    const sticker = {
      id: nanoid(10),
      type: 'draw',
      x: Math.abs(x),
      y: Math.abs(y),
      width: 125,
      height: 125,
      text: 'New Note!',
      fill: '#000',
      path,
      base64: null,
      // ...mousePointTo,
    };

    stickersStore.addSticker(sticker);
  };

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);

    setPoints([[e.pageX, e.pageY, e.pressure]]);
    setDrawing(true);
  };

  const handlePointerMove = (e) => {
    // if (e.buttons !== 1) return;
    if (!isDrawing) return;

    setPoints([...points, [e.pageX, e.pageY, e.pressure]]);
  };

  const handlePointerUp = () => {
    if (isDrawing) {
      setDrawing(false);

      const stroke = getStroke(points, options);
      const pathData = getSvgPathFromStroke(stroke);

      boardStore.setStickerMode('none');
      handleNewDraw(pathData);
    }
  };

  const stroke = getStroke(points, options);
  const pathData = getSvgPathFromStroke(stroke);

  return (
    <Container>
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          width: '100vw',
          height: '100vh',
          touchAction: 'none'
        }}
      >
        {points && <path d={pathData} />}
      </svg>
    </Container>
  );
})

export default DrawLayer;