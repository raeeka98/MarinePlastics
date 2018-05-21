import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';

// to get the pin styles
import '../Map/Map.css';

class Location extends Component {
  constructor(props) {
    super(props);
    // the data is passed from ../Home/Home.js from the Link
    // this.props.location.state is where the Link passes the state to
    this.state = {
      data: this.props.location.state.data || {},
    }
  }

  render() {
    let entries = this.state.data.entries.map((entry) => {
      return(
        <li key={entry._id}>
          <Link to={{ pathname: `/entry/${entry._id}` }}>
            {entry.date}
          </Link>
        </li>
      );
    });

    const CustomMarker = ({ name }) => <div className="custom-marker"><p>{ name }</p></div>;
    return(
      <div>
        <h1>{ this.state.data.name }</h1>
        <div className="uk-grid">
          <div>
            <div style={{height: '500px', width: '500px'}} className="uk-card uk-card-default uk-card-body">
              <GoogleMapReact
                defaultCenter={{
                  lat: this.state.data.lat,
                  lng: this.state.data.lon,
                }}
                defaultZoom={13}
                bootstrapURLKeys={{
                  key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA']
                }}
              >
                <CustomMarker
                  lat={ this.state.data.lat }
                  lng={ this.state.data.lon }
                  name={ this.state.data.name }
                />
              </GoogleMapReact>
            </div>
          </div>
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Entries</h3>
              <ul>
                { entries }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Location;
