import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import geolib from 'geolib';

class SurveyList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
    this.url = 'https://marineplasticsdb.herokuapp.com/api/comments';
  }

  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
        res.data.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.setState({ data: res.data });
      })
  }

  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000)
    }
  }

  //when incorporating into another project
  //(with react-router for instance),
  //this will prevent error messages every 2 seconds
  //once the SurveyBox is unmounted
  componentWillUnmount() {
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  render() {
    let locations = []
    for (let i = 0; i < this.state.data.length; i++) {
      const findIndex = locations.findIndex((a) => {
        const distance = geolib.getDistance(
          {latitude: a.lat, longitude: a.lon},
          {latitude: this.state.data[i].lat, longitude: this.state.data[i].lon}
        );
        // if distanc is less than 1000 meters (approx 1 mile), probably same beach
        return distance < 1500;
      });
      
      if (findIndex > -1) {
        locations[findIndex].entries.push(this.state.data[i]);
      } else {
        locations.push(
          {
            name: this.state.data[i].beach,
            lat: this.state.data[i].lat,
            lon: this.state.data[i].lon,
            entries: [this.state.data[i]]
          }
        );
      }
    }

    let locationNodes = locations.map((location, i) => {
      let path = location.name.replace(/\s/g, '').toLowerCase();
      return (
        <li key={i}>
          <Link to={{
            pathname: `/location/${path}`,
            state: { data: location }
          }}>
            {location.name}: {location.entries.length} Entries
          </Link>
        </li>
      );
    });
    return (
      <ul>
        { locationNodes }
      </ul>
    );
  }
}

  export default SurveyList;
