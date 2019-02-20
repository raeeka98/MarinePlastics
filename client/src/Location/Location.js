import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import { ColumnChart,PieChart } from "./Charts";
// to get the pin styles
import '../Map/Map.css';
import { sumDebrisTypes } from '../_helpers/ChartHelpers';
import axios from 'axios'



class Location extends Component {
  constructor(props) {
    super(props);
    // the data is passed from ../Home/Home.js from the Link
    // this.props.location.state is where the Link passes the state to
    let entryData = this.props.location.state.data; 
    this.state = {
      data: entryData,
      pieChartData:sumDebrisTypes(entryData.surveys),
    }
  }


  render() {
    // for every entry, returns a link to the entry page
    // text is the date cleanup happened
    console.log("Surveys:");
    console.log(this.state.data.surveys);
    var beachSurveys;
    for(var year in this.state.data.surveys){
      var month = year.months;
      for(var i = 0 ; i < month.length; i++){
        var days = month[i];
        for(var j = 0; j < days.length; days++){
          var surveyID = days[i]._id;
          axios.get(`/surveys/${surveyID}`)
            .then(res => {
              beachSurveys.push(res);
            }); //axios call to get survey based on given id?
        }
      }
    }
    let surveys = beachSurveys.map((entry) => {
      return(
        <li key={entry._id}>
          <Link to={{ pathname: `/entry/${entry._id}` }}>
            { entry.date }
          </Link>
        </li>
      );
    });

    

    let checkRange = (num, isLat) => {
     let isInRange = false;
     if (isLat && num < 91 && num > -91) isInRange = true;
     else if (!isLat && num < 181 && num > -181) isInRange = true;
     return isInRange;
   }
   console.log(document.getElementById('pieChart'));
   
    // the marker for the location on the map
    const CustomMarker = () => <div className="custom-marker"><p>{}</p></div>;
    return(
      <div>
        <h1 className="uk-text-primary uk-heading-primary">{ this.state.data.n }</h1>
        <div className="uk-grid uk-grid-match">
          <ColumnChart chartData={this.state.data}/>
          <div className="uk-width-1-4">
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Entries</h3>
              <ul>
                { surveys }
              </ul>
            </div>
          </div>
          <div className="uk-grid-margin uk-width-1-3">
            {
              this.state.data.lat && this.state.data.lon && checkRange(this.state.data.lat, true) && checkRange(this.state.data.lon, false) ?
              (<div style={{height: '500px', width: '500px'}} className="uk-card uk-card-default uk-card-body">
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
                    name={ this.state.data.n }
                  />
                </GoogleMapReact>
              </div>) : null
            }
          </div>
          <PieChart chartData={this.state.pieChartData}/>
        </div>
      </div> 
    );    
  }
}

export default Location;
