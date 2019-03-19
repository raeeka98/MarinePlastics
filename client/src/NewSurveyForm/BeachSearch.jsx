import React, { Component } from 'react';
import axios from 'axios';

/**
 * Beach Search Component
 * Used in SurveyArea to suggest beaches while typing
 */

class BeachSearch extends Component {
  state = {
    query: '', //what gets sent to the backend
    results: [], //list of beaches
    timeout: null, //prevents pinging backend too much
    showItems: false, //if true, show suggestions
  }

  //ping backend for results
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

  //called when the input is changed
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

  //called when a suggestion is clicked
  onSuggestionClick = (res) => {
    this.search.value = res.n;
    this.props.autofill(res._id);
    this.props.setSurveyData('beachName', res.n);
    this.props.setSurveyData('beachID', res._id);
    this.setState({ query: res.n, showItems: false});
  }

  render() {
    //List of suggestions
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
        <label>Name<span className="uk-text-danger">*</span></label>
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
