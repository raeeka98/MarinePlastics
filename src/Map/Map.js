import React, { PropTypes, Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Style from './Map.css';

import Pin from './Pin.jsx';

import {K_SIZE} from './PinStyle.js'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
     center: {lat: 36.949148, lng: -122.0603563},
     zoom: 11
   };

  render() {
    return (
       <div style={{height: '500px', width: '1248px'}}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA'] }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
      >
    <Pin
      lat={36.949148}
      lng={-122.060356}
      text={'Seabright Beach'}
    />
  </GoogleMapReact>
  </div>
);

}
}
  export default Map;
