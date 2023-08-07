import { useState, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { observer } from 'mobx-react-lite';

// Store
import { useStore } from '../../models/root';

import Grid from './grid';

import Note from '../../components/stickers/note';

const minScale = 1;  // You can adjust this value
const maxScale = 6;    // You can adjust this value too

const Whiteboard = () => {
  const [stageX, setStageX] = useState(0);
  const [stageY, setStageY] = useState(0);
  const [stageScale, setStageScale] = useState(1);
  const [stageWidth] = useState(4000);
  const [stageHeight] = useState(2000);
  const stageRef = useRef(null);

  const { stickersStore } = useStore();

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleBy = 1.15;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Clamp the newScale between minScale and maxScale
    newScale = Math.max(minScale, Math.min(newScale, maxScale));

    let x =
      -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale;
    let y =
      -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale;

    const pos = boundFunc({ x, y }, newScale);

    setStageScale(newScale);
    setStageX(pos.x);
    setStageY(pos.y);
  };

  const boundFunc = (pos: { x: number, y: number}, scale: number) => {
    // Assuming viewport width and height are the same as the initial stageWidth and stageHeight.

    // Calculate the scaled width and height of the stage.
    const scaledWidth = stageWidth * scale;
    const scaledHeight = stageHeight * scale;

    const minX = -(scaledWidth - window.innerWidth);
    const minY = -(scaledHeight - window.innerHeight);
    const maxX = 0;
    const maxY = 0;

    // Clamp the X and Y positions to these bounds.
    const x = Math.max(minX, Math.min(pos.x, maxX));
    const y = Math.max(minY, Math.min(pos.y, maxY));

    return {
      x,
      y
    };
  };

  const dragBoundFunc = (pos: { x: number, y: number}) => {
    return boundFunc(pos, stageScale);
  };

  const renderNotes = () => {
    return stickersStore.notes
      .map((note) => (
        <Note
          {...note}
        />
      ))
  }

  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
    >
      <Stage
        ref={stageRef}
        style={{ width: stageWidth, height: stageHeight }}
        x={stageX}
        y={stageY}
        scaleX={stageScale}
        scaleY={stageScale}
        width={stageWidth}
        height={stageHeight}
        onWheel={handleWheel}
        draggable
        dragBoundFunc={dragBoundFunc}
      >
        <Grid
          viewRect={{ x1: 0, y1: 0, x2: stageWidth, y2: stageHeight }}
          gridFullRect={{ x1: 0, y1: 0, x2: stageWidth, y2: stageHeight }}
          stepSize={100}
          scale={stageScale}
        />
        <Layer>
          {renderNotes()}
        </Layer>
      </Stage>
    </div>
  );
}

export default observer(Whiteboard);
