//Search Component

import React, { Component } from 'react';
import axios from 'axios';

const Suggestions = (props) => {
  const options = props.results.map(r => (
    <li key={r._id} onClick={()=>props.clickHandler(r.n)}>
      {r.n}
    </li>
  ))
  return <ul>{options}</ul>
}

class BeachSearch extends Component {
  state = {
    query: '',
    results: [],
    timeout: null,
  }
  
  getInfo = () => {
    if (this.state.query) {
    axios.get("/beaches/search", { params: { q: this.state.query } })
    .then(res => {
      this.setState({ results: res.data.filter((val)=>val.n!==this.state.query)});
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
    } else {
      this.setState({ results: []});
    }
  }
  
  handleInputChange = () => {
    this.setState({ query: this.search.value });
    clearTimeout(this.state.timeout);
    let that = this;
    this.setState({timeout: setTimeout(function () {
      that.getInfo();
    }, 250)});
  }

  onSuggestionClick = (name) => {
    this.search.value = name;
    this.handleInputChange();
  }
  
  render() {
    return (
      <div>
        <label>Name<span className="uk-text-danger">*</span></label>
        <input id="name-of-beach" className="uk-input uk-margin"
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          />
        <Suggestions results={this.state.results} clickHandler={this.onSuggestionClick}/>
      </div>
    )
  }
}

export default BeachSearch