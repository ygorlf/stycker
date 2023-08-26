/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect, useRef } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { nanoid } from 'nanoid';

// Store
import { useStore } from '../../models/root';

import Grid from './grid';
import Selection from './selection';
import DrawLayer from './draw';
import Zoom from './zoom';

import Note from '../../components/stickers/note';
import Photo from '../../components/stickers/photo';
import Draw from '../../components/stickers/draw';

import Toolbar from '../../components/toolbar';
import Toolbox from '../../components/toolbox';
import Editor from '../../components/stickers/editor';
import Minimap from './minimap';

// Images
import note from '../../assets/icons/note.png';
import draw from '../../assets/icons/draw.png';

const minScale = 1;  // You can adjust this value
const maxScale = 8;    // You can adjust this value too
const scaleBy = 1.05;

const MIN_W = 75;
const MIN_H = 75;

const MAX_W = 250;
const MAX_H = 250;

const Whiteboard = observer(() => {
  const stageRef = useRef(null);
  const transformerRef = useRef(null);

  const { boardStore, stickersStore } = useStore();

  const { boardBounds } = boardStore;

  const handleDragStart = (e) => {
    e.evt.stopPropagation();

    // Make sure to deselect any object on move
    stickersStore.setEditableSticker({
      id: '',
      text: '',
      x: 0,
      y: 0,
    });
    stickersStore.updateSelectedStickers([]);
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
      scaleY: stageRef.current.scaleY(),
      width: boardBounds.width,
      height: boardBounds.height,
    });
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();

    // Make sure to deselect any object on zoom
    stickersStore.setEditableSticker({
      id: '',
      text: '',
      x: 0,
      y: 0,
    });
    stickersStore.updateSelectedStickers([]);

    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
    };

    let newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Clamp the newScale between minScale and maxScale
    newScale = Math.max(minScale, Math.min(newScale, maxScale));

    const x =
      -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale;
    const y =
      -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale;

    const pos = boundFunc({ x, y }, newScale);

    boardStore.setBoardBounds({
      x: pos.x,
      y: pos.y,
      scaleX: newScale,
      scaleY: newScale,
      width: boardBounds.width,
      height: boardBounds.height,
    });
  };

  const handleCenteredZoom = (type: 'zoom-in' | 'zoom-out') => {
    const stage = stageRef.current.getStage();
    const oldScaleX = stage.scaleX();
    const oldScaleY = stage.scaleY();

    const center = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };

    const relatedTo = {
      x: (center.x - stage.x()) / oldScaleX,
      y: (center.y - stage.y()) / oldScaleY,
    };

    let newScaleX = type === 'zoom-in' ? oldScaleX * scaleBy : oldScaleX / scaleBy;
    let newScaleY = type === 'zoom-in' ? oldScaleY * scaleBy : oldScaleY / scaleBy;

    // Clamp the newScale between minScale and maxScale
    newScaleX = Math.max(minScale, Math.min(newScaleX, maxScale));
    newScaleY = Math.max(minScale, Math.min(newScaleY, maxScale));

    const newPos = {
      x: center.x - relatedTo.x * newScaleX,
      y: center.y - relatedTo.y * newScaleY,
    };

    // const pos = boundFunc({ x: newPos.x, y: newPos.y }, newScaleX);

    boardStore.setBoardBounds({
      x: newPos.x,
      y: newPos.y,
      scaleX: newScaleX,
      scaleY: newScaleY,
      width: boardBounds.width,
      height: boardBounds.height,
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
        text: 'New Note!',
        fill: '#FFFF88',
        fontStyle: {
          bold: false,
          italic: false,
          underline: false,
        },
        base64: null,
        path: null,
        ...mousePointTo,
      };

      stickersStore.addSticker(newSticker);
      boardStore.setStickerMode('none');
    }

    stickersStore.setEditableSticker({
      id: '',
      text: '',
      x: 0,
      y: 0,
    });
    stickersStore.updateSelectedStickers([]);
  }

  const boundFunc = (pos: { x: number, y: number }, scale: number) => {
    // Assuming viewport width and height are the same as the initial stageWidth and stageHeight.

    // Calculate the scaled width and height of the stage.
    const scaledWidth = boardBounds.width * scale;
    const scaledHeight = boardBounds.height * scale;

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
      case 'draw':
        document.body.style.cursor = `url(${draw}) 0 30, auto`;
        break;
      default:
        document.body.style.cursor = `initial`;
    }
  };

  const handleBoardCursorChange = (mode: string) => {
    switch (mode) {
      case 'drag':
        document.body.style.cursor = `grab`;
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

    const boardReaction = reaction(
      () => boardStore.boardMode,
      () => {
        handleBoardCursorChange(boardStore.boardMode);
      }
    );

    const selectedStickerReaction = reaction(
      () => stickersStore.seledctedStickerId(),
      (id) => {
        if (stickersStore.selectedStickers.length === 1) {
          const node = stageRef.current.findOne(`.${id}`);

          transformerRef.current.nodes([node]);
        }

        if (stickersStore.selectedStickers.length === 0) {
          transformerRef.current.nodes([]);
        }

        transformerRef.current.getLayer().draw();
      }
    );

    return () => {
      boardReaction();
      cursorReaction();
      selectedStickerReaction();
    }
  });

  const renderNotes = () => {
    return stickersStore.notesIds()
      .map((id: string) => (
        <Note
          id={id}
          key={id}
        />
      ))
  }

  const renderPhotos = () => {
    return stickersStore.photosIds()
      .map((id: string) => (
        <Photo
          id={id}
          key={id}
        />
      ))
  }

  const renderDraws = () => {
    return stickersStore.drawsIds()
      .map((id: string) => (
        <Draw
          key={id}
          id={id}
        />
      ))
  }

  const { selectedStickers, editableSticker } = stickersStore;

  return (
    <div
      style={{ width: '100vw', height: '100vh' }}
    >
      <Stage
        ref={stageRef}
        style={{ width: boardBounds.width, height: boardBounds.height }}
        x={boardBounds.x}
        y={boardBounds.y}
        scaleX={boardBounds.scaleX}
        scaleY={boardBounds.scaleY}
        width={boardBounds.width}
        height={boardBounds.height}
        onWheel={handleWheel}
        onClick={handleClick}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        draggable={boardStore.boardMode === 'drag'}
        dragBoundFunc={dragBoundFunc}
      >
        <Grid
          viewRect={{ x1: 0, y1: 0, x2: boardBounds.width, y2: boardBounds.height }}
          gridFullRect={{ x1: 0, y1: 0, x2: boardBounds.width, y2: boardBounds.height }}
          stepSize={100}
          scale={boardBounds.scaleX}
        />
        <Layer>
          <Selection />

          {renderNotes()}
          {renderPhotos()}
          {renderDraws()}

          <Rect
            name='selection-box'
            listening={false}
            fill='rgba(208, 156, 250, 0.2)'
            stroke="#D09CFA"
            strokeWidth={1 / boardBounds.scaleX}
          />

          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < MIN_W || newBox.height < MIN_H) {
                return oldBox;
              }
              if (newBox.width > MAX_W || newBox.height > MAX_H) {
                return oldBox;
              }
              return newBox;
            }}
            draggable={false}
            rotateEnabled={false}
            onDragStart={(e) => e.cancelBubble = true}
            onDragMove={(e) => e.cancelBubble = true}
            onDragEnd={(e) => e.cancelBubble = true}
            enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
            anchorStroke='#000'
            anchorFill='#fff'
            borderStroke='#000'
            anchorStyleFunc={(anchor) => {
              anchor.cornerRadius(10);
            }}
          />
        </Layer>

      </Stage>
      <Minimap />
      {editableSticker.id && (
        <Editor />
      )}
      <Toolbar />
      {selectedStickers.length > 0 && (
        <Toolbox />
      )}
      {boardStore.stickerMode === 'draw' && (
        <DrawLayer />
      )}
      <Zoom
        handleCenteredZoom={handleCenteredZoom}
      />
      
    </div>
  );
})

export default Whiteboard;
