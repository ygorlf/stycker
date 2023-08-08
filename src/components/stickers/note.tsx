import { observer } from 'mobx-react-lite';
import { Group, Rect } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface NoteProps {
  id: string;
}

const Note = observer((props: NoteProps) => {
  const { stickersStore } = useStore();

  const handleDragStart = (e) => {
    e.evt.stopPropagation();
  };

  const handleDragMove = (e) => {
    e.evt.stopPropagation();
  }

  const handleDragEnd = (e) => {
    e.evt.stopPropagation();

    const position = {
      x: e.target.x(),
      y: e.target.y()
    };

    console.log(position);
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