import { useState, MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { useStore } from '../../models/root';

import trash from '../../assets/icons/trash.svg';
import bold from '../../assets/icons/text-bold.svg';
import italic from '../../assets/icons/text-italic.svg';
import underline from '../../assets/icons/text-underline.svg';
import boldActive from '../../assets/icons/text-bold-active.svg';
import italicActive from '../../assets/icons/text-italic-active.svg';
import underlineActive from '../../assets/icons/text-underline-active.svg';

interface ColorItemProps {
  background: string;
}

interface Menu {
  isOpen: boolean;
}

interface FontButtonProps {
  icon: any; // eslint-disable-line
}

interface FontOption {
  id: number;
  type: 'bold' | 'italic' | 'underline';
}

interface SizeItemProps {
  isSelected: boolean;
}

const Container = styled.div`
  position: fixed;
  top: 1rem;
  left: 50%;
  display: flex;
  align-items: center;
  height: 2.75rem;
  padding: 0 0.75rem;
  border-radius: 1.25rem;

  transform: translateX(-50%);
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  background: snow;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ColorItem = styled.li<ColorItemProps>`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  background: ${props => props.background};
`;

const SizeContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.75rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const SizeOption = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  font: 400 1.2rem 'Open Sans', sans-serif;
`;

const SizeList = styled.ul`
  position: absolute;
  top: 1.3rem;
  left: -0.75rem;
  width: 3.5rem;
  max-height: 300px;
  padding: 0 1rem;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  overflow-y: scroll;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  background: snow;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-track {
    background: snow;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #D09CFA;
    border: 1px solid #D09CFA;
  }
`;

const SizeItem = styled.li<SizeItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2rem;
  cursor: pointer;
  color: ${props => props.isSelected ? '#D09CFA' : '#505050'};
  font: 400 0.9rem 'Open Sans', sans-serif;
  font-weight: ${props => props.isSelected ? '700' : '400'};
`;

const FontButton = styled.button<FontButtonProps>`
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.5rem;
  padding-bottom: 1.75rem;
  border: none;
  cursor: pointer;
  background: url(${props => props.icon}) no-repeat center;
  background-size: contain;
`;

const Delete = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  border: none;
  cursor: pointer;
  background: url(${trash}) no-repeat center;
  background-size: contain;
`;

const Separator = styled.div`
  width: 0.5px;
  height: 1.75rem;
  margin: 0 .75rem;
  background: #D09CFA;
`;

const COLORS = [
  '#ff7eb9',
  '#7afcff',
  '#ffa930',
  '#74ed4b',
  '#FFFF88'
];

const SIZES = [
  8,
  12,
  16,
  20,
  24,
  30,
  36,
  48,
  60,
  72,
  96
];

const FONT_OPTIONS: FontOption[] = [
  {
    id: 1,
    type: 'bold',
  },
  {
    id: 2,
    type: 'italic',
  },
  {
    id: 3,
    type: 'underline'
  }
];

const Toolbox = observer(() => {
  const [fontMenu, setFontMenu] = useState<Menu>({
    isOpen: false,
  });

  const { stickersStore } = useStore();

  const handleColorChange = (color: string) => {
    stickersStore.updateStickersColor(stickersStore.selectedStickers, color);
  };

  const handleDelete = () => {
    stickersStore.deleteStickers(stickersStore.selectedStickers);
    stickersStore.updateSelectedStickers([]);
  };

  const handleFontChange = (type: 'bold' | 'italic' | 'underline') => {
    stickersStore.updateStickersFontStyle(stickersStore.selectedStickers, type);
  };

  const handleFontSizeMenu = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();

    setFontMenu({
      isOpen: !fontMenu.isOpen,
    });
  };

  const getFontIcon = (type: string) => {
    const isActive = getFontActive(type);
    switch (type) {
      case 'bold':
        return isActive ? boldActive : bold;
      case 'italic':
        return isActive ? italicActive : italic;
      case 'underline':
        return isActive ? underlineActive : underline;
      default:
        return '';
    }
  };

  const getFontActive = (type: string) => {
    const { isSelectedBold, isSelectedItalic, isSelectedUnderline } = stickersStore;

    const hasBold = isSelectedBold();
    const hasItalic = isSelectedItalic();
    const hasUnderline = isSelectedUnderline();

    switch (type) {
      case 'bold':
        return !!hasBold;
      case 'italic':
        return !!hasItalic;
      case 'underline':
        return !!hasUnderline;
      default:
        return false;
    }
  }

  const renderColors = () => {
    return COLORS.map((color: string) => (
      <ColorItem
        background={color}
        onClick={() => {
          handleColorChange(color)
        }}
      />
    ))
  }

  const renderFonSizes = () => {
    const selectedFontSize = stickersStore.stickers.get(
      stickersStore.selectedStickers[0].id
    )?.fontSize

    return SIZES.map((size: number) => (
      <SizeItem
        onClick={() => {
          stickersStore.updateStickersFontSize(stickersStore.selectedStickers, size);
          setFontMenu({ isOpen: false });
        }}
        isSelected={selectedFontSize === size}
      >
        {size}
      </SizeItem>
    ))
  }

  const renderFontOptions = () => {
    return FONT_OPTIONS.map((font: FontOption) => (
      <FontButton
        key={font.id}
        icon={getFontIcon(font.type)}
        onClick={() => handleFontChange(font.type)}
      />
    ))
  }

  const selectedFontSize = stickersStore.stickers.get(
    stickersStore.selectedStickers[0].id
  )?.fontSize

  return (
    <Container>
      <List>
        {renderColors()}
      </List>
      <Separator />
      <SizeContainer>
        <SizeOption
          onClick={handleFontSizeMenu}
        >
          {selectedFontSize}
        </SizeOption>
        {fontMenu.isOpen && (
          <SizeList>
            {renderFonSizes()}
          </SizeList>
        )}
      </SizeContainer>
      <Separator />
      <List>
        {renderFontOptions()}
      </List>
      <Separator />
      <Delete
        onClick={handleDelete}
      />
    </Container>
  )
})

export default Toolbox;