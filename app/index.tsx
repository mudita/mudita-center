import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './containers/root.container';
import { rootEpic } from "./effects/root.effects";
const {configureStore, history, epicMiddleware} = require('./store/configureStore');
const store = configureStore();

epicMiddleware.run(rootEpic);

render(
  <AppContainer>
    <RootContainer store={store} history={history}/>
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/root.container', () => {
    const NextRoot = require('./containers/root.container').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history}/>
      </AppContainer>,
      document.getElementById('root') as HTMLElement
    );
  });
}
