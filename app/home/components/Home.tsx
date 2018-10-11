import * as React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

interface HomeProps {
  link?: string
}

const StyledInput = styled.input`
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
      <div>
        <Link to='/files'>files</Link>
        <StyledInput
          placeholder="Hover here..."
        />
      </div>
    );
  }
}

export default Home;