import * as React from "react"
import styled from "styled-components"
import Header from "../../../shared/components/header/header.component"
import Navigation from "../../../shared/components/navigation/navigation.component"
import FunctionComponent from "../../../types/function-component.interface"
import Home from "../../components/home/home.component"

const HomePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px #ccc dotted;
  padding: 10px;
`

const HomeContainer = styled.div`
  flex: 1;
`

const HomePage: FunctionComponent = () => {
  return (
    <HomePageWrapper>
      <Navigation />
      <Header />
      <HomeContainer>
        <Home />
      </HomeContainer>
    </HomePageWrapper>
  )
}

export default HomePage
