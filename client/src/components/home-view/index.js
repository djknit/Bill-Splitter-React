import React from 'react';
import style from './style';
import Message from '../message';

function homeView() {
  return (
    <div style={style().homeView}>
      <Message theme="success">
        <h2>Welcome to Dave's Delux Bill Splitting App!</h2>
      </Message>

      <Message theme="info">
        This app aims to make it easy to split <span className="emphasis">any set of bills</span>,
        between <span className="emphasis">any number of people</span>, in <span className="emphasis">any combination.</span>
      </Message>

      <Message theme="warning">
        <h4>This site is under construction.</h4>
        The basic features are still being desinged, so you may have to come back soon for the feature you are looking for.
      </Message>

      <Message theme="secondary">
        <h5>Press "Enter Bills" to get started!</h5>
        The app is not yet completely functional. You will not be able to calculate the bills,
        but you can get a feel for what the app looks like and how it is supposed to work.
        <hr />
        <a
          className="btn btn-primary"
          href="#!/enter-bills"
        >
          Enter Bills
        </a>
      </Message>
    </div>
  );
}

export default homeView;