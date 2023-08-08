import { observer } from 'mobx-react-lite';
import { Group, Rect } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface NoteProps {
  id: string;
}

const Note = observer((props: NoteProps) => {
  const { boardStore, stickersStore } = useStore();

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
      width={attrs.width}
      height={attrs.height}
      draggable
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <Rect
        x={0}
        y={0}
        width={attrs.width}
        height={attrs.height}
        fill={attrs.fill}
      />
    </Group>
  )
});

export default Note;