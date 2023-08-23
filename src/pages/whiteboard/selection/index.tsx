import { useState } from 'react';
import { Rect } from 'react-konva';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../../models/root';
import { SelectedStickerType } from '../../../models/stickers';

import { isOverlap, calcStickerArea } from '../../../utils/math';

const Selection = observer(() => {
  const [tempClickBlocker, setBlocker] = useState(false);

  const { boardStore, stickersStore } = useStore();
  const { selectionArea, boardBounds } = boardStore;

  const handleMouseDown = (e: any) => { // eslint-disable-line
    e.cancelBubble = true;

    console.log('mousedown: ', e);

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();

    const x = (pos.x - stage.x()) / stage.scaleX();
    const y = (pos.y - stage.y()) / stage.scaleY();

    boardStore.setSelectionArea({
      isActive: true,
      x,
      y,
      width: 0,
      height: 0
    });
  };

  const handleMouseMove = (e: any) => { // eslint-disable-line
    if (!selectionArea.isActive) return;

    console.log('mousemove: ', e);

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();

    const x = (pos.x - stage.x()) / stage.scaleX();
    const y = (pos.y - stage.y()) / stage.scaleY();

    boardStore.setSelectionArea({
      ...selectionArea,
      width: x - selectionArea.x,
      height: y - selectionArea.y
    });
  };

  const handleMouseUp = () => {
    const { stickersCoordinates } = stickersStore;

    console.log('mouseup: ');

    const selectedStickers: SelectedStickerType[] = [];

    stickersCoordinates().forEach((sticker) => {
      const absoluteArea = {
        x: Math.min(selectionArea.x, selectionArea.x + selectionArea.width),
        y: Math.min(selectionArea.y, selectionArea.y + selectionArea.height),
        width: Math.abs(selectionArea.width),
        height: Math.abs(selectionArea.height),
      };

      if (isOverlap(absoluteArea, calcStickerArea(sticker))) {
        selectedStickers.push({
          type: 'select',
          id: sticker.id,
          x: sticker.x,
          y: sticker.y,
        });
      }
    });

    if (selectedStickers.length > 0) {
      setBlocker(true);
      stickersStore.updateSelectedStickers(selectedStickers);
    }

    boardStore.setSelectionArea({
      isActive: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
  };

  return (
    <Rect
      x={0}
      y={0}
      width={boardBounds.width}
      height={boardBounds.height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onClick={(e) => {
        if (boardStore.boardMode === 'select' && tempClickBlocker) {
          e.cancelBubble = true;
          setBlocker(false);
        }
      }}
      stroke={'red'}
      strokeWidth={2}
    />
  )
});

export default Selection;