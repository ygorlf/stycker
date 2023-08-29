import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { useStore } from '../../../models/root';

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

const DrawToolbox = observer(() => {
  return (
    <Container>
      
    </Container>
  );
})

export default DrawToolbox;