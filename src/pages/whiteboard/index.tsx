import { Stage, Layer, Text } from 'react-konva';

const Whiteboard = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try click on rect" />
      </Layer>
    </Stage>
  );
};

export default Whiteboard;