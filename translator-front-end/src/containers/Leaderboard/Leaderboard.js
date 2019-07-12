import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from '../../axios-translator';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class Leaderboard extends Component {
  componentDidMount() {
    const { onFetchLeaderboard } = this.props;
    onFetchLeaderboard();
  }

  render() {
    const { leaderboard } = this.props;

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

Leaderboard.propTypes = {
  onFetchLeaderboard: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  leaderboard: state.translator.leaderboard,
});

const mapDispatchToProps = dispatch => ({
  onFetchLeaderboard: () => dispatch(actions.fetchLeaderboard()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Leaderboard, axios));
