import React, { Component } from 'react';
import englandFlag from '../../assets/images/england.png';
import germanyFlag from '../../assets/images/germany.png';
import spanishFlag from '../../assets/images/spain.png';
import Select from '../../components/UI/Select/Select';

class GameSetup extends Component {
    state = {
        gameSetupForm: {
            translateFrom: {
                elementConfig: {
                    options: [
                        { value: 'default', displayValue: 'Choose your option', disabled: true },
                        { value: 'english', displayValue: 'English', icon: englandFlag },
                        { value: 'german', displayValue: 'German', icon: germanyFlag },
                        { value: 'spanish', displayValue: 'Spanish', icon: spanishFlag }
                    ]
                },
                defaultValue: 'default',
                label: 'Translate From',
            },
            translateInto: {
                elementConfig: {
                    options: [
                        { value: 'default', displayValue: 'Choose your option', disabled: true },
                        { value: 'english', displayValue: 'English', icon: englandFlag },
                        { value: 'german', displayValue: 'German', icon: germanyFlag },
                        { value: 'spanish', displayValue: 'Spanish', icon: spanishFlag }
                    ]
                },
                defaultValue: 'default',
                label: 'Into',
            }
        }
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.gameSetupForm) {
            formElementsArray.push({
                id: key,
                config: this.state.gameSetupForm[key]
            });
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <div class="col s12 m6">
                        <Select
                            key={formElement.id}
                            elementConfig={formElement.config.elementConfig}
                            label={formElement.config.label}
                            defaultValue={formElement.config.defaultValue} />
                    </div>
                ))}
                <div className="row center">
                    <a href="http://materializecss.com/getting-started.html" id="download-button" className="btn-large waves-effect waves-light orange">Get Started</a>
                </div>
            </form>
        );
        return (
            <div className="row center">
                {form}
            </div>
        );
    }
}

export default GameSetup;