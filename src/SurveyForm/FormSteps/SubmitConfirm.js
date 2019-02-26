import React, { Component } from 'react';

class SubmitConfirm extends Component {
  render() {
    let classNames = this.props.isHidden ? 'uk-hidden' : '';
    return (
      <div className={classNames}>Thank you! Your response has been recorded.</div>
    );
  }
}

export default SubmitConfirm;
