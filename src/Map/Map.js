import React, { PropTypes, Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

import Style from './Map.css';

import Pin from './Pin.jsx';

import {K_SIZE} from './PinStyle.js'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    this.pollInterval = null;
    this.url = 'http://localhost:3001/api/comments';
  }

  loadCommentsFromServer() {
    axios.get(this.url)
      .then(res => {
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
  static defaultProps = {
     center: {lat: 30, lng: -122},
     zoom: 11
   };

  render() {
    let surveyNodes = this.state.data.map(comment => {
      return (
        <div key={ comment._id } style={{height: '500px', width: '1248px'}}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA'] }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}>

              <Pin
                lat={comment.lat}
                lng={comment.lon}
                text={comment.beach}
              />

          </GoogleMapReact>
        </div>
      );
    });
    return (
      <div>
        { surveyNodes }
      </div>
    );
  }
}
  export default Map;
