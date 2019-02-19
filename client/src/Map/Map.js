import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {locationSort} from '../_helpers/SortHelper';

const NORMAL_SCALE = 1;
const HOVER_SCALE = 1.5;


//We're gonna have to add an on click event for the custom marker, and have a route that will take 
//the user to the page


class CustomMarker extends Component {

  static propTypes = {
    $hover: PropTypes.bool,

    scale: PropTypes.number,
    showBalloon: PropTypes.bool
    };

  static defaultProps = {

  };

  constructor(props){
    super(props);
    this.state = {
      displayText : ""
    };
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  onMouseOut() {
    this.setState( {displayText : ""} );
  }

  onMouseOver(){
    this.setState( {displayText : this.props.text} );
  }

  render(){
    let path = this.props.text.replace(/\s/g, '');
    /*let extractedData = {
      name: this.props.text,
      lat: this.props.location.lat,
      lon: this.props.location.lon,
      entries: [this.props.location]
    };*/
    //console.log(extractedData)
    return(
      <div>
        <div className="custom-marker" onMouseOver={this.onMouseOver}></div>
        <Link to={{ pathname: `/location/${path}`, state:  {data: this.props.location }} }>
          {this.state.displayText}
        </Link>
      </div>
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
     console.log(this.state.data);
    const sortedData = locationSort(this.state.data);
    const GoogleMapsMarkers = sortedData.map((comment) => (
      (comment.lat && comment.lon)
      ? <CustomMarker
          key={comment.entries[0]._id}
          lat={comment.lat}
          lng={comment.lon}
          text={comment.name}
          location={comment}
          $hover={true}
        /> 
      : null
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
