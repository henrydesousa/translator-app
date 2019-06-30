import React, { Component } from 'react';
import InlineInput from '../../components/UI/InlineInput/InlineInput';
import Answers from '../../components/Answers/Answers';
import axios from '../../axios-translator';
import { updateObject } from '../../shared/utility';
import Button from '../../components/UI/Button/Button';

class Translator extends Component {
    state = {
        translatorForm: {
            yourTranslation: {
                description: '',
                label: 'Your translation',
                value: '',
            }
        },
        verbToBeTranslated: null,
        answers: [],
        isCheckOn: true,
        languages: [
            { code: 'en', name: 'English' },
            { code: 'de', name: 'German' },
            { code: 'es', name: 'Spanish' }
        ]
    };

    componentDidMount() {
        this.getNextVerbHandler();
    }

    getNextVerbHandler = () => {
        axios.get('/verbs/next/john_doe')
            .then(res => {
                this.updateYourTranslationField("description", res.data.name);
                this.updateYourTranslationField("value", "");
                this.setState({ verbToBeTranslated: res.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    updateYourTranslationField = (propertyName, value) => {
        const updatedFormElement = updateObject(this.state.translatorForm['yourTranslation'], {
            [propertyName]: value
        });
        const updatedTranslatorForm = updateObject(this.state.translatorForm, {
            yourTranslation: updatedFormElement
        });
        this.setState({ translatorForm: updatedTranslatorForm });
    }

    postAnswerHandler = (event) => {
        event.preventDefault();

        if (this.state.isCheckOn) {
            const answer = {
                user: {
                    alias: "john_doe"
                },
                verbToBeTranslated: this.state.verbToBeTranslated,
                answer: this.state.translatorForm.yourTranslation.value,
                language: this.props.match.params.translateInto
            };
            axios.post('/answers', answer)
                .then(res => {
                    this.addAnswer(res.data);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            this.getNextVerbHandler();
        }
        this.setState(prevState => {
            return { isCheckOn: !prevState.isCheckOn };
        });
    }

    addAnswer = userAnswer => {
        const newAnswerObj = {
            verb: userAnswer.verbToBeTranslated.name,
            answer: userAnswer.answer,
            correct: userAnswer.correct ? "Yes" : "No"
        };
        this.setState(prevState => ({
            answers: [newAnswerObj, ...prevState.answers]
        }));
    }

    getLanguageName = code => {
        return this.state.languages.find( e => e.code === code ).name;
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.postAnswerHandler}>
                    <div className="row center">
                        <h5 className="header col s12 light">
                            Translate from <span className="orange-text">{this.getLanguageName(this.props.match.params.translateFrom)} </span> 
                            into <span className="orange-text">{this.getLanguageName(this.props.match.params.translateInto)} </span> 
                            the verb <b>in bold</b>
                        </h5>
                        <InlineInput
                            description={this.state.translatorForm.yourTranslation.description}
                            label={this.state.translatorForm.yourTranslation.label}
                            value={this.state.translatorForm.yourTranslation.value}
                            changed={(event) => this.updateYourTranslationField("value", event.target.value)} />
                    </div>
                    <div className="row center">
                        <Button>{this.state.isCheckOn ? 'Check' : 'Next Verb'}</Button>
                    </div>
                </form>
                {this.state.answers.length > 0 ? <Answers answers={this.state.answers} /> : null}
            </React.Fragment>
        );
    }
}

export default Translator;