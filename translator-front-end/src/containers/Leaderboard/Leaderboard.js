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
                <tr>
                    <td>{l.userName}</td>
                    <td>{l.score}</td>
                </tr>
            );
        });
        return (
            <React.Fragment>
                <div class="row center">
                    <h5 class="header col s12 light orange-text">Leaderboard</h5>
                </div>
                <div class="row center">
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