import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Child from './Child';
import store from './redux-store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <h1>Hello world</h1>
          <Switch>
            <Route path="/child">
              <Child></Child>
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
