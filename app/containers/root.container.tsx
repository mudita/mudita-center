import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import Routes from '../routes';
import FunctionComponent from '../types/function-component.interface'

interface Props {
  store: any;
  history: History
}

const RootContainer: FunctionComponent<Props> = ({store, history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes/>
      </ConnectedRouter>
    </Provider>
  );
}

export default RootContainer
