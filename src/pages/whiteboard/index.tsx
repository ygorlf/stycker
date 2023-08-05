import { useState } from 'react';
import { Stage, Layer } from 'react-konva';

// Types
import { StickerProps } from '../../types/stickers';

import Note from '../../components/stickers/note';

const Whiteboard = () => {
  const [notes, setNotes] = useState<StickerProps[]>([
    {
      type: 'note',
      x: 10,
      y: 10,
      width: 125,
      height: 140,
      fill: '#E9E91C'
    }
  ]);

  const renderNotes = () => {
    return notes
      .filter(note => note.type === 'note')
      .map((note: StickerProps) => (
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

export default Whiteboard;