import { observer } from 'mobx-react-lite';
import { Group, Rect, Text } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface NoteProps {
  id: string;
}

const Note = observer((props: NoteProps) => {
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

  const handleDoubleClick = (e: any) => { // eslint-disable-line
    e.cancelBubble = true;

    const attrs = stickersStore.stickers.get(props.id);

    const pos = e.target.parent.getAbsolutePosition(); // Get the absolute position of the group, by defaukt the text element will be the target

    stickersStore.updateSelectedStickers([]);

    stickersStore.setEditableSticker({
      id: props.id,
      text: attrs?.text,
      ...pos,
    });
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

  const isSelected = stickersStore.selectedStickers.filter(
    sticker => sticker.id === props.id
  ).length > 0;

  const isDragMode = boardStore.boardMode === 'drag';
  const isStickerMode = boardStore.stickerMode !== 'none';
  const isListening = !isDragMode && !isStickerMode && !boardStore.selectionArea.isActive;

  return (
    <Group
      x={attrs.x}
      y={attrs.y}
      width={attrs.width}
      height={attrs.height}
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
      onDblClick={handleDoubleClick}
    >
      {isSelected && (
        <Rect
          x={-2}
          y={-2}
          width={attrs.width + 4}
          height={attrs.height + 4}
          stroke={'#000'}
          strokeWidth={0.5}
        />
      )}
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
        fontStyle={`${attrs.fontStyle.italic ? 'italic' : ''} ${attrs.fontStyle.bold ? 'bold' : ''}`}
        align='center'
        textDecoration={attrs.fontStyle.underline ? 'underline' : 'normal'}
        verticalAlign='middle'
      />
    </Group>
  )
});

export default Note;