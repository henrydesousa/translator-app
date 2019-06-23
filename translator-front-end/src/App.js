import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import GameSetup from './containers/GameSetup/GameSetup';
import Translator from './containers/Translator/Translator';
import Leaderboard from './containers/Leaderboard/Leaderboard';
import Auth from './containers/Auth/Auth';
import Statistics from './containers/Statistics/Statistics';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/translator" component={Translator} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/auth" component={Auth} />
            <Route path="/statistics" component={Statistics} />
            <Route path="/" exact component={GameSetup} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
