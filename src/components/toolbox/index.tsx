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

interface FontButtonProps {
  icon: any; // eslint-disable-line
  isActive: boolean;
}

interface FontOption {
  id: number;
  type: 'bold' | 'italic' | 'underline';
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

  const getFontIcon = (type: string) => {
    const isActive =  getFontActive(type);
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

  const renderFontOptions = () => {
    return FONT_OPTIONS.map((font: FontOption) => (
      <FontButton
        key={font.id}
        icon={getFontIcon(font.type)}
        onClick={() => handleFontChange(font.type)}
      />
    ))
  }

  return (
    <Container>
      <List>
        {renderColors()}
      </List>
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