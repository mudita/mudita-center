import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from "styled-components";
import Header from "../../shared/components/Header";
import Navigation from "../../shared/components/Navigation";
import Home from '../components/Home';

const HomePageWrapper = styled.div``;

export class HomePage extends React.Component<RouteComponentProps<any>, void> {
  render() {
    return (
      <HomePageWrapper>
        <Navigation/>
        <Header/>
        <Home/>
      </HomePageWrapper>
    );
  }
}

export default (HomePage as any as React.StatelessComponent<RouteComponentProps<any>>);
