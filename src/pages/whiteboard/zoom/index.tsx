import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../../models/root';

import Add from '../../../components/icons/add';
import Subtract from '../../../components/icons/subtract';

interface ZoomProps {
  handleCenteredZoom: (type: 'zoom-in' | 'zoom-out') => void
}

interface ButtonProps {
  isLeft?: boolean;
  isRight?: boolean;
}

const Container = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  border: 1px solid #505050;
  border-radius: 5px;
  background: snow;
`;

const ZoomLabel = styled.span`
  color: #505050;
  font: 400 0.9rem 'Open Sans', sans-serif;
`;

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.25rem;
  border: none;
  outline: none;
  cursor: pointer;
  background: snow;
  
  ${({ isLeft }) => isLeft && `
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 1.15rem;
  `}

${({ isRight }) => isRight && `
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;

    background-repeat: no-repeat;
    background-position: center;
    background-size: 1.15rem;
  `}
`;

const Zoom = observer((props: ZoomProps) => {
  const { boardStore } = useStore();

  const getZoomLevel = () => {
    return Math.round(boardStore.boardBounds.scaleX * 100);
  }

  return (
    <Container>
      <Button
        isLeft
        onClick={() => props.handleCenteredZoom('zoom-out')}
      >
        <Subtract fill='#000' />
      </Button>
      <ZoomLabel>{getZoomLevel()}%</ZoomLabel>
      <Button
        isRight
        onClick={() => props.handleCenteredZoom('zoom-in')}
      >
        <Add fill='#000' />
      </Button>
    </Container>
  )
})

export default Zoom;