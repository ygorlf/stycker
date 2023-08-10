// Libs
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  bottom: 0.5rem;
  right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.25rem 1rem;
  border-radius: 1.5rem;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  background: #e5b8f4;
`;

const Text = styled.a`
  text-decoration: none;
  color: #505050;
  cursor: pointer;
  font: 700 0.8rem 'Open Sans', sans-serif;
`;

const Copyright = () => {
  return (
    <Container>
      <Text
        href='https://www.linkedin.com/in/ygorlf/'
        target='_blank'
      >
        @ygorlf
      </Text>
    </Container>
  )
};

export default Copyright;