import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Group, Image } from 'react-konva';

// Store
import { useStore } from '../../models/root';

interface PhotoProps {
  id: string;
}

const Photo = observer((props: PhotoProps) => {
  const [imageData, setImage] = useState<string | HTMLImageElement>('');

  const { boardStore, stickersStore } = useStore();

  const setupImage = (image: string) => {
    const resource = new window.Image();

		resource.onload = () => {
			setImage(resource);
		};

    console.log(image);

		resource.src = image;
  }

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

  useEffect(() => {
    setupImage(attrs?.base64);
  }, []);

  if (!attrs) return null;

  return (
    <Group
      x={attrs.x}
      y={attrs.y}
      draggable
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