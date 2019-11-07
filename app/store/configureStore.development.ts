import { push, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from "redux-observable";
import thunk from 'redux-thunk';
import * as filesAction from '../files/actions/files.actions';
import createRootReducer from '../reducers';

const epicMiddleware = createEpicMiddleware();

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  };
};

const actionCreators = Object.assign({},
  filesAction,
  {push}
);

const logger = (createLogger as any)({
  level: 'info',
  collapsed: true
});

const history = createHashHistory(); // must be hash, do not change

const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators
  }) as any :
  compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger, routerMiddleware(history), epicMiddleware)
);

export = {
  epicMiddleware,
  history,
  configureStore() {
    const store = createStore(
      createRootReducer(history),
      {},
      enhancer);

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
      );
    }
    return store;
  }
};
