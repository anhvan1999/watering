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
import SensorInfo from './components/SensorInfo/SensorInfo';
import SensorDetail from './components/SensorInfo/SensorDetail';
import AdminFilter from './components/admin-fliter/AdminFilter';
import MotorPage from './components/motor-page/MotorPage';
import UserInfo from './components/user-info/UserInfo';

// Place your page in this area if your page requre 
// user to login before using it
let Area = (props) => {
  let match = useRouteMatch();

  if ((props.username === '' || !props.username) && process.env.REACT_APP_PROTECT !== 'false') {
    return (
      <LoginPage></LoginPage>
    );
  }

  return (
    <div>
      <TopBar></TopBar>
      <Switch>
        <Route path={`${match.url}/child`}>
          <Child></Child>
        </Route>
        <Route path={`${match.url}/sensor/:id`} render={(props) =>
          <SensorDetail name={props.match.params.id} />
        } />
        <Route path={`${match.url}/sensor`}>
          <SensorInfo></SensorInfo>
        </Route>
        <Route path={`${match.url}/admin`}>
          <AdminFilter></AdminFilter>
        </Route>
        <Route path={`${match.url}/motor`}>
          <MotorPage></MotorPage>
        </Route>
        <Route path={`${match.url}/user`}>
          <UserInfo></UserInfo>
        </Route>
      </Switch>
    </div>
  )
};

// Map username to check if user is logged in
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

            <Route exact path="/">
              <HomePage></HomePage>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
