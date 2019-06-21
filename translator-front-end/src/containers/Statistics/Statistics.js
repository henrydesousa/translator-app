import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';

class Statistics extends Component {
    state = {
        authForm: {
            userName: {
                type: 'text',
                label: 'Username',
                value: 'henry.desousa'
            },
            totalScore: {
                type: 'text',
                label: 'Total Score',
                value: '100'
            },
            badges: {
                type: 'text',
                label: 'Badges',
                value: 'GERMAN TRANSLATOR'
            },
        }
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.authForm) {
            formElementsArray.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        return (
            <div className="row center">
                <form>
                    <div className="row">
                        <div className="col s12 m6 offset-m3">
                            <div className="card center-align mg">
                                <div className="card-content">
                                    <span className="card-title orange-text">Your statistics</span>
                                    {formElementsArray.map(formElement => (
                                        <Input
                                            key={formElement.id}
                                            type={formElement.config.type}
                                            label={formElement.config.label}
                                            value={formElement.config.value}
                                            disabled />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Statistics;