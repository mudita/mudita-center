import * as React from "react";
import styled from 'styled-components';

interface HeaderProps {
  link?: string
}

const HeaderWrapper = styled.div``;

class Header extends React.Component<HeaderProps, {}> {

  render() {
    return (
      <HeaderWrapper> Header </HeaderWrapper>
    );
  }
}

export default Header;