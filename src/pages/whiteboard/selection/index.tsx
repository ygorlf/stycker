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

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();

    const x = (pos.x - stage.x()) / stage.scaleX();
    const y = (pos.y - stage.y()) / stage.scaleY();

    const box = stage.findOne('.selection-box');

    box.x(selectionArea.x);
    box.y(selectionArea.y);
    box.width(x - selectionArea.x);
    box.height(y - selectionArea.y);

    stage.batchDraw();
  };

  const handleMouseUp = (e: any) => { // eslint-disable-line
    const { stickersCoordinates } = stickersStore;

    const stage = e.target.getStage();
    const pos = stage.getPointerPosition();
    const box = stage.findOne('.selection-box');

    box.x(0);
    box.y(0);
    box.width(0);
    box.height(0);

    stage.batchDraw();

    const x = (pos.x - stage.x()) / stage.scaleX();
    const y = (pos.y - stage.y()) / stage.scaleY();

    const area = {
      x: selectionArea.x,
      y: selectionArea.y,
      width: x - selectionArea.x,
      height: y - selectionArea.y
    }

    const selectedStickers: SelectedStickerType[] = [];

    stickersCoordinates().forEach((sticker) => {
      const absoluteArea = {
        x: Math.min(area.x, area.x + area.width),
        y: Math.min(area.y, area.y + area.height),
        width: Math.abs(area.width),
        height: Math.abs(area.height),
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
    />
  )
});

export default Selection;