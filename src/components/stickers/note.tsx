import { observer } from 'mobx-react-lite';
import { Group, Rect } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface NoteProps {
  id: string;
}

const Note = observer((props: NoteProps) => {
  const { stickersStore } = useStore();

  const attrs = stickersStore.stickers.get(props.id);

  if (!attrs) return null;

  return (
    <Group
      x={attrs.x}
      y={attrs.y}
      width={attrs.width}
      height={attrs.height}
      draggable
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