import React, { Component } from 'react';
import InlineInput from '../../components/UI/InlineInput/InlineInput';
import Answers from '../../components/Answers/Answers';

class Translator extends Component {
    state = {
        translatorForm: {
            yourTranslation: {
                description: 'To buy',
                label: 'Your translation'
            }
        },
        answers: [
            {
                id: 1,
                verb: "to buy",
                answer: "kaufen",
                correct: "YES"
            },
            {
                id: 2,
                verb: "to buy",
                answer: "kaufen",
                correct: "NO"
            },
            {
                id: 3,
                verb: "to buy",
                answer: "kaufen",
                correct: "NO"
            }
        ]
    };

    render() {
        return (
            <React.Fragment>
                <div className="row center">
                    <h5 className="header col s12 light">Translate from <span className="orange-text">English</span> into <span className="orange-text">German</span> the verb <b>in bold</b></h5>
                    <InlineInput 
                        description={this.state.translatorForm.yourTranslation.description}
                        label={this.state.translatorForm.yourTranslation.label} />
                </div>
                <div className="row center">
                    <a href="http://materializecss.com/getting-started.html" id="download-button" className="btn-large waves-effect waves-light orange">Check</a>
                </div>
                <div className="row center">
		            <h5 className="header col s12 light orange-text">Your answers</h5>
	            </div>
                <div className="row center">
                    <Answers answers={this.state.answers} />
                </div>
            </React.Fragment>
        );
    }
}

export default Translator;