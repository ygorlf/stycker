import { } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { Stage, Layer, Rect } from 'react-konva';

import { useStore } from '../../../models/root';

interface ContainerProps {
  top: number;
  left: number;
  width: number;
  height: number;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const WIDTH = 250;
const HEIGHT = 125;
const WINDOW_W = window.innerWidth;
const WINDOW_H = window.innerHeight;
const MARGIN = 16;
const ZOOM_H = 36;

const Minimap = observer(() => {
  const { boardStore } = useStore();

  const { boardBounds } = boardStore;

  const localWidth = (WINDOW_W / boardBounds.width) * WIDTH / boardBounds.scaleX;
  const localHeight = (WINDOW_H / boardBounds.height) * HEIGHT / boardBounds.scaleY;

  const localX = Math.abs((boardBounds.x / boardBounds.width) * WIDTH / boardBounds.scaleX);
  const localY = Math.abs((boardBounds.y / boardBounds.height) * HEIGHT / boardBounds.scaleY);

  return (
    <Container
      top={WINDOW_H - HEIGHT - MARGIN * 1.75 - ZOOM_H}
      left={WINDOW_W - WIDTH - MARGIN}
      width={WIDTH}
      height={HEIGHT}
    >
      <Stage
        x={0}
        y={0}
        width={WIDTH}
        height={HEIGHT}
      >
        <Layer>
          <Rect
            x={0}
            y={0}
            width={WIDTH}
            height={HEIGHT}
            fill='#fff'
            stroke="#505050"
          />

          <Rect
            x={localX}
            y={localY}
            width={localWidth}
            height={localHeight}
            fill='rgba(208, 156, 250, 0.2)'
            stroke="#D09CFA"
            strokeWidth={0.5}
          />
        </Layer>
      </Stage>
    </Container>
  )
});

export default Minimap;