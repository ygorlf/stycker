// Libs
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

// Store
import { useStore } from '../../models/root';

interface ContainerProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface InputProps {
  fontSize: number;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  text-align: center;
  background: ${props => props.color};
  z-index: 10;
`;

const Text = styled.input<InputProps>`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  color: #505050;
  text-align: center;
  font: 400 ${props => props.fontSize}px 'Montserrat', sans-serif;
  background: none;
`;

const Editor = observer(() => {
  const { boardStore, stickersStore } = useStore();
  const { editableSticker } = stickersStore;


  const sticker = stickersStore.stickers.get(editableSticker.id);

  if (!sticker) return null;

  return (
    <Container
      x={editableSticker.x}
      y={editableSticker.y}
      width={sticker.width * boardStore.boardBounds.scaleX}
      height={sticker.height * boardStore.boardBounds.scaleY}
      color={sticker.fill}
    >
      <Text
        value={sticker.text}
        fontSize={20 * boardStore.boardBounds.scaleX}
        onChange={(e) => {
          stickersStore.updateStickerText({
            id: editableSticker.id,
            text: e.target.value,
          })
        }}
        autoFocus
      />
    </Container>
  )

});

export default Editor;