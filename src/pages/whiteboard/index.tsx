import { useState, useEffect, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';

// Store
import { useStore } from '../../models/root';

import Grid from './grid';

import Toolbar from '../../components/toolbar';
import Note from '../../components/stickers/note';

// Images
import note from '../../assets/icons/note.png';

const minScale = 1;  // You can adjust this value
const maxScale = 8;    // You can adjust this value too
const scaleBy = 1.15;

const Whiteboard = observer(() => {
  const [stageWidth] = useState(4000);
  const [stageHeight] = useState(2000);
  const stageRef = useRef(null);

  const { boardStore, stickersStore } = useStore();

  const handleDragStart = (e) => {
    e.evt.stopPropagation();
  };

  const handleDragMove = (e) => {
    e.evt.stopPropagation();
  };

  const handleDragEnd = (e) => {
    e.evt.stopPropagation();

    const position = {
      x: e.target.x(),
      y: e.target.y()
    };

    boardStore.setBoardBounds({
      ...position,
      scaleX: stageRef.current.scaleX(),
      scaleY: stageRef.current.scaleY()
    });
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
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

    boardStore.setBoardBounds({
      x: pos.x,
      y: pos.y,
      scaleX: newScale,
      scaleY: newScale
    });
  };

  const handleClick = (e) => {
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    if (boardStore.stickerMode === 'note') {
      const newSticker = {
        id: nanoid(10),
        type: 'note',
        width: 125,
        height: 125,
        fill: '#FFFF88',
        ...mousePointTo,
      };

      stickersStore.addSticker(newSticker);
      boardStore.setStickerMode('none');
    }
  }

  const boundFunc = (pos: { x: number, y: number }, scale: number) => {
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

  const dragBoundFunc = (pos: { x: number, y: number }) => {
    return boundFunc(pos, boardStore.boardBounds.scaleX);
  };

  const handleCursorChange = (mode: string) => {
    switch (mode) {
      case 'note':
        document.body.style.cursor = `url(${note}), default`;
        break;
      default:
        document.body.style.cursor = `initial`;
    }
  };

  useEffect(() => {
    const cursorReaction = reaction(
      () => boardStore.stickerMode,
      () => {
        handleCursorChange(boardStore.stickerMode);
      }
    );

    return () => {
      cursorReaction();
    }
  }, []);

  const renderNotes = () => {
    return stickersStore.ids
      .map((id: string) => (
        <Note
          id={id}
          key={id}
        />
      ))
  }

  const { boardBounds } = boardStore;

  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
    >
      <Stage
        ref={stageRef}
        style={{ width: stageWidth, height: stageHeight }}
        x={boardBounds.x}
        y={boardBounds.y}
        scaleX={boardBounds.scaleX}
        scaleY={boardBounds.scaleY}
        width={stageWidth}
        height={stageHeight}
        onWheel={handleWheel}
        onClick={handleClick}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        draggable
        dragBoundFunc={dragBoundFunc}
      >
        <Grid
          viewRect={{ x1: 0, y1: 0, x2: stageWidth, y2: stageHeight }}
          gridFullRect={{ x1: 0, y1: 0, x2: stageWidth, y2: stageHeight }}
          stepSize={100}
          scale={boardBounds.scaleX}
        />
        <Layer>
          {renderNotes()}
        </Layer>
      </Stage>
      <Toolbar />
    </div>
  );
})

export default Whiteboard;
