import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch, useRouteMatch} from 'react-router-dom';

// This component is used for test
function Child(props) {
  let match = useRouteMatch();

  console.log(props);
  return (
    <div className="padding-top-62">
      <h1>{props.username}</h1>
      <Switch>
        <Route path={`${match.url}/foo`}>
        <h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1><h1>Foo</h1>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    username: state.user.username
  };
};

export default connect(mapStateToProps, null)(Child);
