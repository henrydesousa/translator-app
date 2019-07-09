import React, { Component } from 'react';
import axios from '../../axios-translator';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Leaderboard extends Component {
  state = {
    leaderboard: [],
  };

  componentDidMount() {
    axios
      .get('/leaders')
      .then((res) => {
        this.setState({ leaderboard: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { leaderboard } = this.state;

    const leaderboardRows = leaderboard.map(l => (
      <tr key={l.userId}>
        <td>{l.userId}</td>
        <td>{l.totalScore}</td>
      </tr>
    ));
    return (
      <React.Fragment>
        <div className="row center">
          <h5 className="header col s12 light orange-text">Leaderboard</h5>
        </div>
        <div className="row center">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Score</th>
              </tr>
            </thead>

            <tbody>{leaderboardRows}</tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default withErrorHandler(Leaderboard, axios);
