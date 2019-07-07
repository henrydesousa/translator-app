import React, { Component } from 'react';
import axios from '../../axios-translator';
import { updateObject } from '../../shared/utility';
import InlineInput from '../../components/UI/InlineInput/InlineInput';

class Statistics extends Component {
  state = {
    statisticsForm: {
      userName: {
        description: 'Username',
        value: '',
      },
      totalScore: {
        description: 'Total Score',
        value: '',
      },
      badges: {
        description: 'Badges',
        value: '',
      },
    },
  };

  componentDidMount() {
    axios
      .get('stats?userId=john_doe')
      .then((res) => {
        this.inputChangedHandler('userName', res.data.userId);
        this.inputChangedHandler('totalScore', res.data.score);
        this.inputChangedHandler('badges', res.data.badges.join(' '));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  inputChangedHandler = (inputIdentifier, value) => {
    const { statisticsForm } = this.state;

    const updatedFormElement = updateObject(statisticsForm[inputIdentifier], {
      value,
    });
    const updatedStatisticsForm = updateObject(statisticsForm, {
      [inputIdentifier]: updatedFormElement,
    });
    this.setState({ statisticsForm: updatedStatisticsForm });
  };

  render() {
    const { statisticsForm } = this.state;
    const formElementsArray = [];
    Object.keys(statisticsForm).forEach((key) => {
      formElementsArray.push({
        id: key,
        config: statisticsForm[key],
      });
    });

    return (
      <div className="row center">
        <form>
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <div className="card center-align mg">
                <div className="card-content">
                  <span className="card-title orange-text">
                    Your statistics
                  </span>
                  {formElementsArray.map(formElement => (
                    <div className="row" key={formElement.id}>
                      <InlineInput
                        description={formElement.config.description}
                        value={formElement.config.value}
                        disabled
                      />
                    </div>
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
