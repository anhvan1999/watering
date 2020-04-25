import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

// Redux store
import store from './redux-store/store';

// Components
import Child from './Child';
import TopBar from './components/top-bar/TopBar';
import LoginPage from './components/login-page/LoginPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <TopBar></TopBar>
          <Switch>
            <Route path="/child">
              <Child></Child>
            </Route>
            <Route path="/login">
              <LoginPage></LoginPage>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
