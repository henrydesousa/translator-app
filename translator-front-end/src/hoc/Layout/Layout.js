import React, { Component } from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Toolbar />
                <div className="section no-pad-bot">
                    <div className="container">
                        <br /><br />
                        {this.props.children}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Layout;