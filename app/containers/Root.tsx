import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes';

interface RootType {
  store: any;
  history: History
}

export default function Root({store, history}: RootType) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes/>
      </ConnectedRouter>
    </Provider>
  );
}
