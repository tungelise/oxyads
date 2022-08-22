import React from 'react';
import { initContract } from './near-api';
import ReactDOM from 'react-dom';
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';

import { HashRouter } from 'react-router-dom';
import './assets/base.css';
import Main from './DemoPages/Main';
import configureStore from './config/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement
  );
};

window.nearInitPromise = initContract()
  .then(() => {
    console.log('contract inited');
    renderApp(Main);

    if (module.hot) {
      module.hot.accept('./DemoPages/Main', () => {
        const NextApp = require('./DemoPages/Main').default;
        renderApp(NextApp);
      });
    }
    unregister();

    // registerServiceWorker();
  })
  .catch(e => {
    console.error(e);
  });

