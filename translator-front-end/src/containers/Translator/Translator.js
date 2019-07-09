import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InlineInput from '../../components/UI/InlineInput/InlineInput';
import Answers from '../../components/Answers/Answers';
import axios from '../../axios-translator';
import { updateObject } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Translator extends Component {
  state = {
    translatorForm: {
      yourTranslation: {
        description: '',
        value: '',
      },
    },
    verbToBeTranslated: null,
    isCheckOn: true,
    languages: [
      { code: 'en', name: 'English' },
      { code: 'de', name: 'German' },
      { code: 'es', name: 'Spanish' },
    ],
    showError: false,
    isAnswerCorrect: false,
  };

  componentDidMount() {
    this.getNextVerbHandler();
  }

  getNextVerbHandler = () => {
    axios
      .get('/verbs/next/john_doe')
      .then((res) => {
        this.updateYourTranslationField('description', res.data.name);
        this.updateYourTranslationField('value', '');
        this.setState({ verbToBeTranslated: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateYourTranslationField = (propertyName, value) => {
    const {
      translatorForm,
      translatorForm: { yourTranslation },
    } = this.state;

    const updatedFormElement = updateObject(yourTranslation, {
      [propertyName]: value,
    });
    const updatedTranslatorForm = updateObject(translatorForm, {
      yourTranslation: updatedFormElement,
    });
    this.setState({ translatorForm: updatedTranslatorForm });
  };

  postAnswerHandler = (event) => {
    const {
      translatorForm: {
        yourTranslation: { value },
      },
      isCheckOn,
      verbToBeTranslated,
    } = this.state;

    event.preventDefault();
    if (isCheckOn) {
      if (value === '') {
        this.setState({ showError: true });
      } else {
        this.setState({ showError: false });
        const {
          match: {
            params: { translateInto },
          },
          onAddAnswer,
        } = this.props;
        const answer = {
          user: {
            alias: 'john_doe',
          },
          verbToBeTranslated,
          answer: value,
          language: translateInto,
        };
        axios
          .post('/answers', answer)
          .then((res) => {
            onAddAnswer(res.data);
            this.setState({ isAnswerCorrect: res.data.correct });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      this.getNextVerbHandler();
    }

    this.setState((prevState) => {
      if (prevState.showError) return null;
      return { isCheckOn: !prevState.isCheckOn };
    });
  };

  getLanguageName = (code) => {
    const { languages } = this.state;
    return languages.find(e => e.code === code).name;
  };

  render() {
    const {
      translatorForm: {
        yourTranslation: { description, value },
      },
      isCheckOn,
      showError,
      isAnswerCorrect,
    } = this.state;
    const {
      match: {
        params: { translateFrom, translateInto },
      },
      answers,
    } = this.props;

    let errorMessage = null;
    if (showError) {
      errorMessage = (
        <div>
          <p style={{ color: 'red' }}>Please enter an answer.</p>
        </div>
      );
    }

    let answerIcon = null;
    if (!isCheckOn) {
      answerIcon = isAnswerCorrect ? (
        <i className="material-icons">thumb_up</i>
      ) : (
        <i className="material-icons">thumb_down</i>
      );
    }

    return (
      <React.Fragment>
        <form onSubmit={this.postAnswerHandler}>
          <div className="row center">
            <h5 className="header col s12 light">
              Translate from
              <span className="orange-text">
                {' '}
                {this.getLanguageName(translateFrom)}
              </span>
              {' into'}
              <span className="orange-text">
                {' '}
                {this.getLanguageName(translateInto)}
              </span>
              {' the verb'}
              <b> in bold</b>
            </h5>
            <InlineInput
              description={description}
              value={value}
              changed={event =>
                this.updateYourTranslationField('value', event.target.value)
              }
            />
            {answerIcon}
            {errorMessage}
          </div>
          <div className="row center">
            <Button>{isCheckOn ? 'Check' : 'Next Verb'}</Button>
          </div>
        </form>
        {answers.length > 0 ? <Answers userAnswers={answers} /> : null}
      </React.Fragment>
    );
  }
}

Translator.propTypes = {
  // eslint-disable-next-line react/require-default-props
  match: PropTypes.shape({
    params: PropTypes.shape({
      translateFrom: PropTypes.string.isRequired,
      translateInto: PropTypes.string.isRequired,
    }),
  }),
  answers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  answers: state.translator.userAnswers,
});

const mapDispatchToProps = dispatch => ({
  onAddAnswer: userAnswer => dispatch(actions.addUserAnswer(userAnswer)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Translator, axios));
