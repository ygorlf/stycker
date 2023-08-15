import { observer } from 'mobx-react-lite';
import { Group, Path } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface DrawProps {
  id: string;
}

const Draw = observer((props: DrawProps) => {
  const { boardStore, stickersStore } = useStore();

  const handleClick = (e) => {
    e.cancelBubble = true;

    const pos = e.target.parent.getAbsolutePosition(); // Get the absolute position of the group, by defaukt the text element will be the target

    stickersStore.updateSelectedStickers([{
      type: 'select',
      id: props.id,
      ...pos,
    }]);
  };

  const handleDragStart = (e) => {
    e.cancelBubble = true;
  };

  const handleDragMove = (e) => {
    e.cancelBubble = true;
  }

  const handleDragEnd = (e) => {
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

  return (
    <Group
      x={attrs.x}
      y={attrs.y}
      draggable
      listening={boardStore.stickerMode === 'none' && !boardStore.selectionArea.isActive}
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