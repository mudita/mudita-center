import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import './app.global.scss';
import Root from './containers/Root';
import { rootEpic } from "./effects/root.effects";
const {configureStore, history, epicMiddleware} = require('./store/configureStore');
const store = configureStore();


epicMiddleware.run(rootEpic);

render(
  <AppContainer>
    <Root store={store} history={history}/>
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history}/>
      </AppContainer>,
      document.getElementById('root') as HTMLElement
    );
  });
}

