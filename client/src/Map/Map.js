import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {locationSort} from '../_helpers/SortHelper';


//We're gonna have to add an on click event for the custom marker, and have a route that will take 
//the user to the page


class CustomMarker extends Component {

  constructor(props){
    super(props);
    this.state = {
      displayText : ""
    };
  }

  /*
   * render():
   *  This function renders the marker using the data passed by Map's render function.
   *  There are checks to see if the marker is being hovered over and if so, we can create
   *  a bubble that will display the beach's name rather than rendering the beach name directly
   *  on the marker. A link to the beach is also created with a pathname that removes the
   *  spaces in the beach's name.
   * 
   *  Arguments: None
   *  
   *  Returns: A rendered react component that changes behavior based on a mouse hover
   * 
   *  Raises: None
  */

  render(){
    const style = this.props.$hover ? "custom-marker-hover" : "custom-marker";
    const beachName = this.props.$hover ? this.props.text : "";
    const beachBubble = this.props.$hover ? "tooltiptext" : "";
    let path = this.props.text.replace(/\s/g, '');
 
    return(
      <div>
        <Link className={style} to={{ pathname: `/location/${path}`, state:  {data: this.props.location }} }>
          <span className = {beachBubble}>
            {beachName}
          </span>
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
    this.url = '/beaches';
  }


  /*
   *  loadCommentsFromServer()
   *    This function has been refactored to work with the new database structure that Noel 
   *    developed. Rather than obtaining the survey data of each beach, it now just obtains
   *    the beach name, ID, latitude, and longitude, which are the minimun parameters needed
   *    for the locations to be displayed on the maps
   * 
   *    Arguments: None
   * 
   *    Returns: None (Stores object containing beach information in this.state.data)
   * 
   *    Raises: None
   * 
  */
  loadCommentsFromServer() {
    axios.get(this.url + '/map')
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
    // eslint-disable-next-line
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }
  static defaultProps = {
     center: {lat: 36.965652,lng: -121.954729},
     zoom: 13
   };


   render(){
     // For each beach, create a marker that contains its id, lat, lon, and name
    const GoogleMapsMarkers = this.state.data.map((comment) => (
      (comment.lat && comment.lon)
      ? <CustomMarker
          key={comment._id}
          lat={comment.lat}
          lng={comment.lon}
          text={comment.n}
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
