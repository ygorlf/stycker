import { Stage, Layer } from 'react-konva';
import { observer } from 'mobx-react-lite';

// Store
import { useStore } from '../../models/root';

import Note from '../../components/stickers/note';

const Whiteboard = () => {
  const { stickersStore } = useStore();

  const renderNotes = () => {
    return stickersStore.notes
      .map((note) => (
        <Note
          {...note}
        />
      ))
  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {renderNotes()}
      </Layer>
    </Stage>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default observer(Whiteboard); 