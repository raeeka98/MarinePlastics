/**
 * Map.js
 * Code for Google Map used on home page and location page. Has markers
 * displaying the location of the beaches.
 */
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CustomMarker extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayText : ""
    };
  }

  /**
   * Renders the marker using the data passed by Map's render function. There
   * are checks to see if the marker is being hovered over and if so, we can
   * create a bubble that will display the beach's name rather than rendering
   * the beach name directly on the marker. A link to the beach is also created
   * with a pathname that removes the spaces in the beach's name.
   * @return rendered react component that changes behavior based on a mouse
   * hover
   */
  render(){
    const style = this.props.$hover ? "custom-marker-hover" : "custom-marker";
    const beachName = this.props.$hover ? this.props.text : "";
    const beachBubble = this.props.$hover ? "tooltiptext" : "";
    let path = this.props.text.replace(/\s/g, '');
 
    return(
      <div>
        <Link
          className={style}
          to={{
            pathname: `/location/${path}`,
            state: {
              data: this.props.location, 
              userProfile: this.props.userProfile
              //, getUserProfile: this.props.getUserProfile,
              // isAuth: this.props.isAuth
            }
          }}
        >
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

  /**
   * Obtainsbeach name, ID, latitude, and longitude, which are the minimum
   * parameters needed for the locations to be displayed on the map. Stores
   * object containing beach info in state.
   */
  loadCommentsFromServer() {
    axios.get(this.url + '/map')
      .then(res => {
        this.setState({ data: res.data });
      })
  }

  /**
   * When component mounts, calls loadCommentsFroServer() every two seconds.
   */
  componentDidMount() {
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  /**
   * When incorporating into another project (with react-router for instance),
   * this will prevent error messages every 2 seconds once the SurveyBox is
   * unmounted.
   */
  componentWillUnmount() {
    // eslint-disable-next-line
    this.pollInterval && clearInterval(this.pollInterval);
    this.pollInterval = null;
  }
  static defaultProps = {
     center: {lat: 36.965652,lng: -121.954729},
     zoom: 13
   };

  /**
   * Creates marker for each beach that contains its id, lat, lon, and name.
   * @return rendered react component that displays map
   */
   render(){
    const GoogleMapsMarkers = this.state.data.map((comment) => (
      (comment.lat && comment.lon)
      ? <CustomMarker
          key={comment._id}
          lat={comment.lat}
          lng={comment.lon}
          text={comment.n}
          location={comment}
          userProfile={this.props.userProfile}
          //getUserProfile={this.props.getUserProfile}
          //isAuth={this.props.isAuth}
          $hover={true}
        /> 
      : null
    ));
    return (
      <div id="mapView">
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
