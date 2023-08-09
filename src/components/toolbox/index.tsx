import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { useStore } from '../../models/root';

import trash from '../../assets/icons/trash.svg';

interface ColorItemProps {
  background: string;
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
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  background: snow;
`;

const ColorList = styled.ul`
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
  border-radius: 50%;
  cursor: pointer;
  background: ${props => props.background};

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const Delete = styled.button`
  width: 1.75rem;
  height: 1.75rem;
  margin: 0 0 0 1.5rem;
  border: none;
  cursor: pointer;
  background: url(${trash}) no-repeat center;
  background-size: contain;
`;

const COLORS = [
  '#ff7eb9',
  '#7afcff',
  '#ffa930',
  '#74ed4b',
  '#FFFF88'
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

  return (
    <Container>
      <ColorList>
        {renderColors()}
      </ColorList>
      <Delete
        onClick={handleDelete}
      />
    </Container>
  )
})

export default Toolbox;