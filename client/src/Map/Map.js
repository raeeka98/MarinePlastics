import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

//We're gonna have to add an on click event for the custom marker, and have a route that will take 
//the user to the page

class CustomMarker extends Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className = "custom-marker"><p>{}</p></div>
    );
  }
}

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
    this.url = '/surveys';
  }

  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
        this.setState({ data: res.data });
        console.log(res.data);
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
    // eslint-disable-next-line
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }
  static defaultProps = {
     center: {lat: 36.965652,lng: -121.954729},
     zoom: 13
   };


   render(){
    const GoogleMapsMarkers = this.state.data.map((comment) => (
      (comment.lat && comment.lon)? 
        <CustomMarker
          key={comment.id}
          lat={comment.lat}
          lng={comment.lon}
          text={comment.beach}
          $hover={true}
        /> : <p></p>
    ));
    return (
      <div style={{height: '500px', width: '100%'}}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}

          bootstrapURLKeys={{
          key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA']
          }}
        >
          { GoogleMapsMarkers }
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
