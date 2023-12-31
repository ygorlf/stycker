import { observer } from 'mobx-react-lite';
import { Group, Path } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface DrawProps {
  id: string;
}

const Draw = observer((props: DrawProps) => {
  const { boardStore, stickersStore } = useStore();

  const handleClick = (e: any) => { // eslint-disable-line
    e.cancelBubble = true;

    const pos = e.target.parent.getAbsolutePosition(); // Get the absolute position of the group, by defaukt the text element will be the target

    stickersStore.updateSelectedStickers([{
      type: 'select',
      id: props.id,
      ...pos,
    }]);
  };

  const handleDragStart = (e: any) => { // eslint-disable-line
    e.cancelBubble = true;
  };

  const handleDragMove = (e: any) => { // eslint-disable-line
    e.cancelBubble = true;
  }

  const handleDragEnd = (e: any) => { // eslint-disable-line
    e.cancelBubble = true;

    const position = {
      x: ((e.target.getAbsolutePosition().x - boardStore.boardBounds.x)
        / boardStore.boardBounds.scaleX),
      y: ((e.target.getAbsolutePosition().y - boardStore.boardBounds.y)
        / boardStore.boardBounds.scaleY)
    };

    stickersStore.updateStickerPosition({
      id: props.id,
      ...position,
    });
  }

  const attrs = stickersStore.stickers.get(props.id);

  if (!attrs) return null;

  const isDragMode = boardStore.boardMode === 'drag';
  const isStickerMode = boardStore.stickerMode !== 'none';
  const isListening = !isDragMode && !isStickerMode && !boardStore.selectionArea.isActive;

  return (
    <Group
      x={attrs.x}
      y={attrs.y}
      draggable
      listening={isListening}
      onMouseEnter={() => {
        document.body.style.cursor = 'pointer';
      }}
      onMouseLeave={() => {
        document.body.style.cursor = 'initial';
      }}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <Path
        x={0}
        y={0}
        data={attrs.path || ''}
        fill={attrs.fill || '#000'}
      />
    </Group>
  )
});

export default Draw;