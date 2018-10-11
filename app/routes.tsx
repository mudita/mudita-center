import * as React from 'react';
import { Route, Switch } from 'react-router';
import App from './containers/App';
import HomePage from './home/pages/HomePage';
import FilesPage from "./files/pages/FilesPage";

export default () => (
  <App>
    <Switch>
      <Route path="/files" component={FilesPage}/>
      <Route path="/" component={HomePage}/>
    </Switch>
  </App>
);
