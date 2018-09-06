import * as React from "react";
import styled from 'styled-components';

interface HomeProps {
  link?: string
}

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <Input
        placeholder="Hover here..."
      />
    );
  }
}

export default Home;