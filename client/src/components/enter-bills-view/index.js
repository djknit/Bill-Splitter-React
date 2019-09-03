import React, { Component } from 'react';
import windowWidth from '../../data/windowWidth';
import getStyle from './style';
import ParticipantsSection from './participants-section';
import BillsSection from './bills-section';
import Message from '../message';

class EnterBillsView extends Component {
  constructor() {
    super();
    this.updateStyle = this.updateStyle.bind(this);
    this.state = {
      style: getStyle(windowWidth.value)
    };
  }

  updateStyle() {
    this.setState({
      style: getStyle(windowWidth.value)
    });
  }

  componentDidMount() {
    windowWidth.subscribe(this.updateStyle);
    this.test = function() {
      console.log('test');
    }
  }

  componentWillUnmount() {
    windowWidth.unsub(this.updateStyle);
  }

  render() {
    const { style } = this.state;
    return (
      <div style={style.view}>
        <h1 style={style.mainHeading}>
          Bill Entry Page
        </h1>
        <hr style={style.firstHr} />

        <Message theme="info">
          <h5 style={style.messageHeading}>Follow these steps</h5>
          <hr style={style.messageHr} />
          <ol style={style.instructionsList}>
            <li style={style.instructionsListItemNotLast}>
              Add the names of the people who are splitting the bills under the "Participants" section.
            </li>
            <li style={style.instructionsListItemNotLast}>
              Add all of the bills you wish to include, one at a time, under the "Bills" section.
            </li>
            <li>
              Click the "Calculate Bills" button to get your results!
            </li>
          </ol>
        </Message>

        <ParticipantsSection />

        <BillsSection />

        <hr style={style.lastHr} />
        <button className="button is-primary" style={style.calcBillsButton}>
          Calculate Bills
        </button>
      </div>
    );
  }
}

export default EnterBillsView;