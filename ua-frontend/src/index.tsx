import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import store from './store';
import HomePage from './components/homepage';
import Login from './components/login';
import SignUp from './components/signup';
import Users from './components/user';


export const NotFound = () => <h3>Not Found</h3>;

const App = () => <Provider store={store}>
  <Router>
    <div>
      <Link to="/">Home</Link>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
</Provider>

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
