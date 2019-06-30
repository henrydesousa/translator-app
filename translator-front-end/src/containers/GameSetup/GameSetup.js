import React, { Component } from 'react';
import englandFlag from '../../assets/images/england.png';
import germanyFlag from '../../assets/images/germany.png';
import spanishFlag from '../../assets/images/spain.png';
import Select from '../../components/UI/Select/Select';
import Button from '../../components/UI/Button/Button';
import { updateObject } from '../../shared/utility';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class GameSetup extends Component {
    state = {
        gameSetupForm: {
            translateFrom: {
                elementConfig: {
                    options: [
                        { value: 'default', displayValue: 'Choose your option', disabled: true },
                        { value: 'en', displayValue: 'English', icon: englandFlag },
                        { value: 'de', displayValue: 'German', icon: germanyFlag },
                        { value: 'es', displayValue: 'Spanish', icon: spanishFlag }
                    ]
                },
                value: 'default',
                label: 'Translate From',
            },
            translateInto: {
                elementConfig: {
                    options: [
                        { value: 'default', displayValue: 'Choose your option', disabled: true },
                        { value: 'en', displayValue: 'English', icon: englandFlag },
                        { value: 'de', displayValue: 'German', icon: germanyFlag },
                        { value: 'es', displayValue: 'Spanish', icon: spanishFlag }
                    ]
                },
                value: 'default',
                label: 'Into',
            }
        }
    };

    startGameHandler = (event) => {
        event.preventDefault();
        this.props.onGameStart(this.state.gameSetupForm.translateFrom.value, this.state.gameSetupForm.translateInto.value);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.gameSetupForm[inputIdentifier], {
            value: event.target.value
        });
        const updatedGameSetupForm = updateObject(this.state.gameSetupForm, {
            [inputIdentifier]: updatedFormElement
        });
        this.setState({ gameSetupForm: updatedGameSetupForm });
    }

    render() {
        if (this.props.redirectToTranslator) {
            return <Redirect to={`/translator/${this.props.translateFrom}/${this.props.translateInto}`} />
        }

        const formElementsArray = [];
        for (let key in this.state.gameSetupForm) {
            formElementsArray.push({
                id: key,
                config: this.state.gameSetupForm[key]
            });
        }

        const form = (
            <form onSubmit={this.startGameHandler}>
                {formElementsArray.map(formElement => (
                    <div key={formElement.id} className="col s12 m6">
                        <Select
                            elementConfig={formElement.config.elementConfig}
                            label={formElement.config.label}
                            value={formElement.config.value}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    </div>
                ))}
                <Button>Get Started</Button>
            </form>
        );
        return (
            <div className="row center">
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        redirectToTranslator: state.translator.redirectToTranslator,
        translateFrom: state.translator.translateFrom,
        translateInto: state.translator.translateInto
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGameStart: (translateFrom, translateInto) => dispatch(actions.startGame(translateFrom, translateInto))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSetup);