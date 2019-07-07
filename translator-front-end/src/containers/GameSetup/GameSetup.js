import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import englandFlag from '../../assets/images/england.png';
import germanyFlag from '../../assets/images/germany.png';
import spanishFlag from '../../assets/images/spain.png';
import Select from '../../components/UI/Select/Select';
import Button from '../../components/UI/Button/Button';
import { updateObject } from '../../shared/utility';
import * as actions from '../../store/actions/index';

class GameSetup extends Component {
  state = {
    gameSetupForm: {
      translateFrom: {
        elementConfig: {
          options: [
            {
              value: 'default',
              displayValue: 'Choose your option',
              disabled: true,
            },
            { value: 'en', displayValue: 'English', icon: englandFlag },
            { value: 'de', displayValue: 'German', icon: germanyFlag },
            { value: 'es', displayValue: 'Spanish', icon: spanishFlag },
          ],
        },
        value: 'default',
        label: 'Translate From',
      },
      translateInto: {
        elementConfig: {
          options: [
            {
              value: 'default',
              displayValue: 'Choose your option',
              disabled: true,
            },
            { value: 'en', displayValue: 'English', icon: englandFlag },
            { value: 'de', displayValue: 'German', icon: germanyFlag },
            { value: 'es', displayValue: 'Spanish', icon: spanishFlag },
          ],
        },
        value: 'default',
        label: 'Into',
      },
    },
  };

  startGameHandler = (event) => {
    const {
      gameSetupForm: {
        translateFrom: { value: valueFrom },
        translateInto: { value: valueInto },
      },
    } = this.state;
    const { onGameStart } = this.props;

    event.preventDefault();
    onGameStart(valueFrom, valueInto);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const { gameSetupForm } = this.state;

    const updatedFormElement = updateObject(gameSetupForm[inputIdentifier], {
      value: event.target.value,
    });
    const updatedGameSetupForm = updateObject(gameSetupForm, {
      [inputIdentifier]: updatedFormElement,
    });
    this.setState({ gameSetupForm: updatedGameSetupForm });
  };

  render() {
    const { redirectToTranslator, translateFrom, translateInto } = this.props;
    const { gameSetupForm } = this.state;

    if (redirectToTranslator) {
      return <Redirect to={`/translator/${translateFrom}/${translateInto}`} />;
    }

    const formElementsArray = [];
    Object.keys(gameSetupForm).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: gameSetupForm[key],
      });
    });

    const form = (
      <form onSubmit={this.startGameHandler}>
        {formElementsArray.map(formElement => (
          <div key={formElement.id} className="col s12 m6">
            <Select
              elementConfig={formElement.config.elementConfig}
              label={formElement.config.label}
              value={formElement.config.value}
              changed={event => this.inputChangedHandler(event, formElement.id)}
            />
          </div>
        ))}
        <Button>Get Started</Button>
      </form>
    );
    return <div className="row center">{form}</div>;
  }
}

GameSetup.propTypes = {
  onGameStart: PropTypes.func.isRequired,
  redirectToTranslator: PropTypes.bool.isRequired,
  translateFrom: PropTypes.string.isRequired,
  translateInto: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  redirectToTranslator: state.translator.redirectToTranslator,
  translateFrom: state.translator.translateFrom,
  translateInto: state.translator.translateInto,
});

const mapDispatchToProps = dispatch => ({
  onGameStart: (translateFrom, translateInto) =>
    dispatch(actions.startGame(translateFrom, translateInto)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameSetup);
