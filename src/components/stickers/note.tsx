import { observer } from 'mobx-react-lite';
import { Group, Rect } from 'react-konva';

const Note = (props: any) => {
  return (
    <Group
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      draggable
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

// eslint-disable-next-line react-refresh/only-export-components
export default observer(Note);