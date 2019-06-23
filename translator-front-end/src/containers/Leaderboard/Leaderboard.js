import React, { Component } from 'react';

class Leaderboard extends Component {
    state = {
        leaderboard: [
            {
                userName: 'Henry',
                score: 100
            },
            {
                userName: 'Alan',
                score: 95
            },
            {
                userName: 'Jonathan',
                score: 30
            }
        ]
    };

    render() {
        const leaderboardRows = this.state.leaderboard.map(l => {
            return (
                <tr key={l.userName}>
                    <td>{l.userName}</td>
                    <td>{l.score}</td>
                </tr>
            );
        });
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

                        <tbody>
                            {leaderboardRows}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default Leaderboard;