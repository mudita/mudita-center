import * as React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

interface NavigationProps {
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

class Navigation extends React.Component<NavigationProps, {}> {

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

export default Navigation;