import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import createHistory from 'history/createBrowserHistory';

import Header from './components/Header';
import configureStore from './configureStore';
import RentalContainer from './containers/RentalContainer';
import ReturnContainer from './containers/ReturnContainer';
import TopContainer from './containers/TopContainer';
import './index.css';
import * as serviceWorker from './serviceWorker';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const history = createHistory();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(configureStore)}>
    <Router history={history}>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/rental/:id" component={RentalContainer} />
          <Route path="/return" component={ReturnContainer} />
          <Route path="/" component={TopContainer} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
