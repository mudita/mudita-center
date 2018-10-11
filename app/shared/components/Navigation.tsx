import * as React from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

interface NavigationProps {
  link?: string
}

const NavigationWrapper = styled.div``;

class Navigation extends React.Component<NavigationProps, {}> {

  render() {
    return (
      <NavigationWrapper>
        <Link to='/files'> Files </Link>
      </NavigationWrapper>
    );
  }
}

export default Navigation;