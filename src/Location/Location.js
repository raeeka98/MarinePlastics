import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.location.state.data || {},
    }
  }

  render() {
    let entries = this.state.data.entries.map((entry) => {
      return(
        <li key={entry._id}>
          <Link to={{
            pathname: `/entry/${entry._id}`,
            state: { comment: entry }
          }}>
            {entry.date}
          </Link>
        </li>
      );
    });

    return(
      <div>
        <h1>{ this.state.data.name }</h1>
        <div className="uk-card uk-card-default uk-card-body uk-width-1-4">
          <h3 className="uk-card-title">Survey Entries</h3>
          <ul>
            { entries }
          </ul>
        </div>
      </div>
    );
  }
}

export default Location;
