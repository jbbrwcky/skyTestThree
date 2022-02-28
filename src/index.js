import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router';
import 'sanitize.css/sanitize.css';

import { store, history } from './store';
import DisplayUser from './containers/displayuser';
import App from './containers/app';

import './index.css';

const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <>
        <Switch>
          <Route exact path="/" render={() => (<App />)} />
          <Route path="/user" render={() => (<DisplayUser />)} />
        </Switch>
      </>
    </ConnectedRouter>
  </Provider>,
  target
);
