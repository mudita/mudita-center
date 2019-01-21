import * as React from 'react';
import styled from "styled-components";

const AppWrapper = styled.div``;

export default class App extends React.Component {
  render() {
    return (
      <AppWrapper>
        {this.props.children}
      </AppWrapper>
    );
  }
}
