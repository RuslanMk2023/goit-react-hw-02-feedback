import { Component } from 'react';

import { Statistics, FeedbackOptions, Section, Notification } from 'components';

import styles from './App.module.css';

const optionsTypes = ['good', 'neutral', 'bad'];

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  countTotalFeedback = () =>
    this.state.good + this.state.neutral + this.state.bad;

  countPositiveFeedbackPercentage = () =>
    Math.round((this.state.good / this.countTotalFeedback()) * 100);

  onLeaveFeedback = option => {
    const { good, neutral, bad } = this.state;

    const optionFunctions = {
      good: () => this.setState({ good: good + 1 }),
      neutral: () => this.setState({ neutral: neutral + 1 }),
      bad: () => this.setState({ bad: bad + 1 }),
    };
    optionFunctions[option] && optionFunctions[option]();
  };

  render() {
    const { good, neutral, bad } = this.state;

    return (
      <div className={styles.card}>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={optionsTypes}
            onLeaveFeedback={this.onLeaveFeedback}
          />
        </Section>

        <Section title="Statistics:">
          {!(this.countTotalFeedback() == 0) ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
