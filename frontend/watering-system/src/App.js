import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter as Router, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAuthState } from './service/auth-service';
import wsService from './service/ws-service';

// Redux store
import store from './redux-store/store';

// Components
import Child from './Child';
import TopBar from './components/top-bar/TopBar';
import HomePage from './components/home-page/HomePage';
import LoginPage from './components/login-page/LoginPage';

let Area = (props) => {
  let match = useRouteMatch();

  if (props.username === '' || !props.username) { 
    return (
      <LoginPage></LoginPage>
    )
  }
  return (
    <div>
      <TopBar></TopBar>
      <Switch>
        <Route path={`${match.url}/child`}>
          <Child></Child>
        </Route>
      </Switch>
    </div>
  )
};

function mapStateToPropsArea(state) {
  return {
    username: state.user.username
  }
}

Area = connect(mapStateToPropsArea, null)(Area);


function App() {
  setAuthState();
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/app">
              <Area></Area>
            </Route>
            
            <Route path="/login">
              <LoginPage></LoginPage>
            </Route>

            <Route path="/">
              <HomePage></HomePage>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
