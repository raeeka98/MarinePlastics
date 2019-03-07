//Search Component

import React, { Component } from 'react';
import axios from 'axios';

class BeachSearch extends Component {
  state = {
    query: '', //what gets sent to the backend
    results: [], //list of beaches
    timeout: null, //prevents pinging backend too much
    showItems: false, //if true, show suggestions
  }
  
  getInfo = () => {
    if (this.state.query) {
      axios.get("/beaches/search", { params: { q: this.state.query } })
      .then(res => {
        this.setState({ results: res.data, showItems: true});
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
    this.setState({ query: name, showItems: false});
  }
  
  render() {
    
    const Suggestions = (props) => {
      const options = props.results.map(r => (
        <li key={r._id} onClick={()=>this.onSuggestionClick(r.n)}>
          {r.n}
        </li>
      ))
      return <ul>{options}</ul>
    }

    return (
      <div onMouseLeave={()=>this.setState({showItems: false})}>
        <label>Name<span className="uk-text-danger">*</span></label>
        <input id="name-of-beach" className="uk-input uk-margin"
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
          />
        {this.state.showItems
          ? <Suggestions results={this.state.results} />
          : null}
      </div>
    )
  }
}

export default BeachSearch