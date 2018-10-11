import * as React from "react";
import styled from 'styled-components';

interface HomeProps {
  link?: string
}

const HomeWrapper = styled.div`

`;


class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <HomeWrapper> Home </HomeWrapper>
    );
  }
}

export default Home;