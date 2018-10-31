import * as React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

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