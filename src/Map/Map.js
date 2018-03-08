import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
     center: {lat: 36.949148, lng: -122.0603563},
     zoom: 11
   };

  render() {
    return (
       <div style={{height: '1000px', width: '1000px'}}>
      <GoogleMapReact
    bootstrapURLKeys={{ key: ['AIzaSyC0KMFMCzYY0TZKQSSGyJ7gDW6dfBIDIDA'] }}
    defaultCenter={this.props.center}
    defaultZoom={this.props.zoom}
  >
    <AnyReactComponent
      lat={36.949148}
      lng={-122.060356}
      text={'Testing Location Service'}
    />
  </GoogleMapReact>
  </div>
);

}
}
  export default Map;
