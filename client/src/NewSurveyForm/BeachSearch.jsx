/**
 * BeachSearch.jsx
 * Used in Survey Area section in SurveySubsections/SurveyArea.jsx to suggest
 * beaches while typing.
 */
import React, { Component } from 'react';
import axios from 'axios';

class BeachSearch extends Component {
  state = {
    //what gets sent to the backend
    query: '',
    //list of beaches
    results: [],
    //prevents pinging backend too much
    timeout: null,
    //if true, show suggestions
    showItems: false,
  }

  /**
   * Ping backend for results.
   */
  getInfo = () => {
    if (this.state.query) {
      axios.get("/beaches/search", { params: { q: this.state.query } })
      .then(res => {
        this.setState({ results: res.data.slice(0,4), showItems: true});
      }).catch(err => {
        console.log(err);
      });
    } else {
      this.setState({ results: []});
    }
  }

  /**
   * Called when the input is changed.
   */
  handleInputChange = () => {
    this.props.setSurveyData('beachName', this.search.value);
    this.props.setSurveyData('beachID', null);
    this.setState({ query: this.search.value });
    clearTimeout(this.state.timeout);
    let that = this;
    this.setState({timeout: setTimeout(function () {
      that.getInfo();
    }, 250)});
  }

  /**
   * Called when a suggestion is clicked so entries can be autofilled.
   */
  onSuggestionClick = (res) => {
    this.search.value = res.n;
    this.props.autofill(res._id);
    this.props.setSurveyData('beachName', res.n);
    this.props.setSurveyData('beachID', res._id);
    this.setState({ query: res.n, showItems: false});
  }

  /**
   * List of suggestions.
   * @return JSX code for dropdown
   */
  render() {
    const Suggestions = (props) => {
      const options = props.results.map(r => (
        <li key={r._id}>
          <button
            className="uk-button uk-button-default"
            onClick={()=>this.onSuggestionClick(r)}>{r.n}
          </button>
        </li>
      ))
      return (
        <div style={{display:'block'}} uk-dropdown="bottom-left; duration:0">
          <ul className="uk-nav uk-dropdown-nav">{options}</ul>
        </div>
      );
    }

    return (
      <div>
        <input id="beachName" className="uk-input uk-margin"
          placeholder="Name of Beach"
          ref={input => this.search = input}
          defaultValue={this.props.defaultValue}
          onChange={()=>this.handleInputChange()}
        />
        {this.state.showItems && this.state.query
          ? <Suggestions results={this.state.results} />
          : null}
      </div>
    )
  }
}

export default BeachSearch