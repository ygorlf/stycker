import { observer } from 'mobx-react-lite';
import { Group, Rect, Text } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface NoteProps {
  id: string;
}

const Note = observer((props: NoteProps) => {
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

  const handleDoubleClick = (e) => {
    e.cancelBubble = true;

    const attrs = stickersStore.stickers.get(props.id);

    const pos = e.target.parent.getAbsolutePosition(); // Get the absolute position of the group, by defaukt the text element will be the target

    stickersStore.setEditableSticker({
      id: props.id,
      text: attrs?.text,
      ...pos,
    });
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
      width={attrs.width}
      height={attrs.height}
      draggable
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onDblClick={handleDoubleClick}
    >
      <Rect
        x={0}
        y={0}
        width={attrs.width}
        height={attrs.height}
        fill={attrs.fill}
      />
      <Text
        x={attrs.width * 0.05}
        width={attrs.width * 0.9}
        height={attrs.height}
        text={attrs.text}
        fontSize={20}
        fill='#505050'
        fontFamily='Montserrat'
        align='center'
        verticalAlign='middle'
      />
    </Group>
  )
});

export default Note;