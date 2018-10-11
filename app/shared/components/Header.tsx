import * as React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

interface HeaderProps {
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

class Header extends React.Component<HeaderProps, {}> {

  render() {
    return (
      <div>
        <Link to='/files'>files</Link>
        <Input
          placeholder="Hover here..."
        />
      </div>
    );
  }
}

export default Header;