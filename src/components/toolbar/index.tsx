import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

// Store
import { useStore } from '../../models/root';

import drag from '../../assets/icons/drag.svg';
import note from '../../assets/icons/note.svg';
// import emoji from '../../assets/icons/emoji.svg';
import picture from '../../assets/icons/picture.svg';
import draw from '../../assets/icons/draw.svg';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 0;
  width: 5rem;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: snow;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  transform: translateY(-50%);
`;

const Option = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  min-height: 70px;
  margin: 0 auto;
  border: none;
  cursor: pointer;
  background: none;

  &:not(:last-child) {
    border-bottom: 0.5px solid #D09CFA;
  }
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

const GhostInput = styled.input`
  width: 0;
  height: 0;
  border: none;
  cursor: none;
  outline: none;
  background: none;
`;

const Toolbar = observer(() => {
  const { boardStore, stickersStore } = useStore();

  const inputImageRef = useRef<HTMLInputElement>(null);

  const createImageSticker = (base64: string) => {
    const { x, y, scaleX } = boardStore.boardBounds;

    const position = {
      x: 10 / scaleX - x / scaleX,
      y: 10 / scaleX - y / scaleX
    };

    const sticker = {
      id: nanoid(10),
      type: 'photo',
      width: 125,
      height: 125,
      base64,
      fill: null,
      text: null,
      path: null,
      fontStyle: {
        bold: false,
        italic: false,
        underline: false,
      },
      ...position,
    };

    stickersStore.addSticker(sticker);
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    const filereader = new FileReader();

    filereader.onload = function (evt) {
      const base64 = evt?.target?.result as string;
      createImageSticker(base64);
    };

    filereader.readAsDataURL(file);
  };

  return (
    <>
      <Container>
      <Option
          onClick={() => {
            boardStore.toggleBoardMode();
          }}
        >
          <Icon src={drag} />
        </Option>
        <Option
          onClick={() => {
            boardStore.setStickerMode('note');
          }}
        >
          <Icon src={note} />
        </Option>
        {/* <Option
          onClick={() => {
            boardStore.setStickerMode('emoji');
          }}
        >
          <Icon src={emoji} />
        </Option> */}
        <Option
          onClick={() => {
            inputImageRef.current?.click();
          }}
        >
          <Icon src={picture} />
        </Option>
        <Option
          onClick={() => {
            boardStore.setStickerMode('draw');
          }}
        >
          <Icon src={draw} />
        </Option>
      </Container>
      <GhostInput
        ref={inputImageRef}
        type='file'
        accept='image/png, image/gif, image/jpeg'
        onChange={handleImageUpload}
      />
    </>
  )
});

export default Toolbar;