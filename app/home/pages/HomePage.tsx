import * as React from 'react';
import styled from "styled-components";
import Header from "../../shared/components/Header";
import Navigation from "../../shared/components/Navigation";
import Home from '../components/Home';

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px #ccc dotted;
  padding: 10px;
`;

const NavigationContainer = styled.div`
  flex: 1;
`;

const HeaderContainer = styled.div`
  flex: 1;
`;

const HomeContainer = styled.div`
  flex: 1;
`;


function HomePage() {
  return (
    <HomePageWrapper>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
      <HeaderContainer>
        <Header/>
      </HeaderContainer>
      <HomeContainer>
        <Home/>
      </HomeContainer>
    </HomePageWrapper>
  );
}

export default HomePage;
