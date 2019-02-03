import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import {  } from 'react-easy-chart';
import ReactChartkick,{ PieChart,ColumnChart } from "react-chartkick";
import { Chart } from "chart.js";
// to get the pin styles
import '../Map/Map.css';
import { sumDebrisTypes, sumTotals } from '../_helpers/ChartHelpers';

ReactChartkick.addAdapter(Chart);

class Location extends Component {
  constructor(props) {
    super(props);
    // the data is passed from ../Home/Home.js from the Link
    // this.props.location.state is where the Link passes the state to
    let entryData = this.props.location.state.data; 
    this.state = {
      data: entryData,
      showSRSData:true,
      srsBarData:sumTotals(entryData.entries, true),
      asBarData: sumTotals(entryData.entries, false),
      pieChartData:sumDebrisTypes(entryData.entries),
      pieOptions:{animation:{animateRotate:true},responsive:true}
    }

    this.changeBarGraph = this.changeBarGraph.bind(this);
  }

  changeBarGraph(e) {
    this.setState({showSRSData: e.target.value === 'srs'});    
  }


  render() {
    // for every entry, returns a link to the entry page
    // text is the date cleanup happened
    let entries = this.state.data.entries.map((entry) => {
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
    const CustomMarker = ({ name }) => <div className="custom-marker"><p>{ name }</p></div>;
    return(
      <div>
        <h1 className="uk-text-primary uk-heading-primary">{ this.state.data.name }</h1>
        <div className="uk-grid uk-grid-match">
          <div className="uk-width-3-4">
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Number of Pieces of Debris Collected</h3>
              <select className="uk-select uk-form-large" id='bar-type' onChange={ this.changeBarGraph }>
                <option value="srs">in Surface Rib Scan Surveys</option>
                <option value="as">in Accumulation Sweep Surveys</option>
              </select>
              <div className="uk-align-center" style={{width: '650px'}}>
                <ColumnChart data={ this.state.showSRSData ? this.state.srsBarData : this.state.asBarData } library={{animation:{animateScale:true}}} />
              </div>
            </div>
          </div>
          <div className="uk-width-1-4">
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Survey Entries</h3>
              <ul>
                { entries }
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
                    name={ this.state.data.name }
                  />
                </GoogleMapReact>
              </div>) : null
            }
          </div>
          <div className="uk-grid-margin uk-width-1-1">
            <div className="uk-card uk-card-default uk-card-body">
              <h3 className="uk-card-title">Types of Debris Found</h3>
                <PieChart id="pieChart" data={ this.state.pieChartData } library={this.state.pieOptions} height="500px" width="500px" />
            </div>
          </div>
        </div>
      </div> 
    );    
  }
}

export default Location;
