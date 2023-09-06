import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Group, Image, Rect } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface PhotoProps {
  id: string;
}

const Photo = observer((props: PhotoProps) => {
  const [imageData, setImage] = useState<undefined | CanvasImageSource>(undefined);

  const { boardStore, stickersStore } = useStore();

  const setupImage = (image: string) => {
    const resource = new window.Image();

    resource.onload = () => {
      setImage(resource);
    };

    resource.src = image;
  }

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

  useEffect(() => {
    setupImage(attrs?.base64 || '');
  }, []); // eslint-disable-line

  if (!attrs) return null;

  const isSelected = stickersStore.selectedStickers.filter(
    sticker => sticker.id === props.id
  ).length > 0;

  const isDragMode = boardStore.boardMode === 'drag';
  const isStickerMode = boardStore.stickerMode !== 'none';
  const isListening = !isDragMode && !isStickerMode && !boardStore.selectionArea.isActive;

  return (
    <Group
      name={attrs.id}
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
      <Image
        x={0}
        y={0}
        width={attrs.width}
        height={attrs.height}
        image={imageData}
      />
    </Group>
  )
});

export default Photo;