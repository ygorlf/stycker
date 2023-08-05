import React from 'react';
import { Group, Rect } from 'react-konva';

// Types
import { StickerProps } from '../../types/stickers';

const Note = (props: StickerProps) => {
  return (
    <Group
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
    >
      <Rect
        x={0}
        y={0}
        width={props.width}
        height={props.height}
        fill={props.fill}
      />
    </Group>
  )
};

export default Note;