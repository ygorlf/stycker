import { } from 'react';
import styled from 'styled-components';

import note from '../../assets/icons/note.svg';
import emoji from '../../assets/icons/emoji.svg';
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
  background: #ffd5ff;
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
    border-bottom: 0.5px solid #505050;
  }
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

const Toolbar = () => {
  return (
    <Container>
      <Option>
        <Icon src={note} />
      </Option>
      <Option>
        <Icon src={emoji} />
      </Option>
      <Option>
        <Icon src={picture} />
      </Option>
      <Option>
        <Icon src={draw} />
      </Option>
    </Container>
  )
};

export default Toolbar;