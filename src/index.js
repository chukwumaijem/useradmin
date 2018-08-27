import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import store from './store';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Users from './Components/Users';

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
registerServiceWorker();
