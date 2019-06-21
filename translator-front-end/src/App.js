import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import GameSetup from './containers/GameSetup/GameSetup';
import Translator from './containers/Translator/Translator';
import Leaderboard from './containers/Leaderboard/Leaderboard';
import Auth from './containers/Auth/Auth';
import Statistics from './containers/Statistics/Statistics';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Statistics />
        </Layout>
      </div>
    );
  }
}

export default App;
