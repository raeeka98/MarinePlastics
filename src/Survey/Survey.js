import React, { Component } from 'react';
// import { Link, Redirect } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import marked from 'marked';
import Auth from '../Auth';
import axios from 'axios';

import SurveyTableRow from './SurveyTableRow';

class Survey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toRedirect: false,
      comment: this.props.location.state.comment || {},
    };

    this.handleCommentDelete = this.handleCommentDelete.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.auth = new Auth();
    this.url = 'http://localhost:3001/api/comments';
  }

  handleCommentDelete(id) {
    axios.delete(`${this.url}/${id}`)
      .then(res => {
        console.log('Comment deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteComment(e) {
    e.preventDefault();
    if (this.auth.getAccessToken() === this.state.comment.user_id) {
      let id = this.state.comment._id;
      this.handleCommentDelete(id);
      console.log('deleted');
      this.setState({ toRedirect: true  });
    } else {
      window.alert('Can only delete your own entries.');
    }
  }

  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }
  render() {
    return (
      this.state.toRedirect
      ? <Redirect to='/' />
      : (
        <div>
          <h3>Team Information</h3>
          <p>
            <b>Team Leader: </b>
            <i>{this.state.comment.user}</i>
          </p>
          <p>
            <b>Organization: </b>
            <i>{this.state.comment.org}</i>
          </p>
          <p>
            <b>Email: </b>
            <i>{this.state.comment.email}</i>
          </p>
          <p>
            <b>Date Conducted: </b>
            <i>{this.state.comment.date}</i>
          </p>
          {/* <p>
            <b>Date Submitted: </b>
            <i>{this.state.comment.input_date}</i>
          </p> */}

          <h3>Survey Area</h3>
          <p>
            <b>Name of Beach: </b>
            <i>{this.state.comment.beach}</i>
          </p>
          <p>
            <b>Reason for Location: </b>
            <i>{this.state.comment.reason}</i>
          </p>
          <p>
            <b>Substrate Type: </b>
            <i>{this.state.comment.st}</i>
          </p>
          <p>
            <b>GPS Coordinates (Starting Point): </b>
            <i>{this.state.comment.lat}</i>, <i>{this.state.comment.lon}</i>
          </p>
          <p>
            <b>Slope: </b>
            <i>{this.state.comment.slope}</i>
          </p>
          <p>
            <b>Nearest River Output ~ Name: </b>
            <i>{this.state.comment.nroName}</i>
            <b> Distance: </b>
            <i>{this.state.comment.nroDist}m</i>
          </p>
          <p>
            <b>Aspect: </b>
            <i>{this.state.comment.aspect}</i>
          </p>
          <p>
            <b>Last Tide and Height: </b>
            <i>{this.state.comment.lastTide}</i>
            <b> Next Tide and Height: </b>
            <i>{this.state.comment.nextTide}</i>
          </p>
          <p>
            <b>Wind Direction: </b>
            <i>{this.state.comment.windDir}</i>
          </p>
          <p>
            <b>Major Usage: </b>
            <i>{this.state.comment.majorUse}</i>
          </p>

          <h3> Basic Cleanup </h3>
          <p><b> Total Weight (in pounds): </b><i>{this.state.comment.weight}</i></p>
          <p><b> Number of People: </b><i>{this.state.comment.NumberOfPeople}</i></p>

          <h3>Surface Rib Scan Survey</h3>
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Debris Type</th>
                <th>Amount Fresh</th>
                <th>Amount Weathered</th>
              </tr>
            </thead>
            {/* when switch to array schema of debris, will be able to use map to programatically add rows */}
            {/* Same for accumulation survey */}
            <tbody>
              <SurveyTableRow 
                name='Cigarette Butt'
                fresh={ this.state.comment.SRSData.FreshCig }
                weathered={ this.state.comment.SRSData.WeatheredCig }
              />
              <SurveyTableRow 
                name='Fishing Line'
                fresh={ this.state.comment.SRSData.FreshFline }
                weathered={ this.state.comment.SRSData.WeatheredFline }
              />
              <SurveyTableRow 
                name='Glass'
                fresh={ this.state.comment.SRSData.FreshGlass }
                weathered={ this.state.comment.SRSData.WeatheredGlass }
              />
              <SurveyTableRow 
                name='Paper'
                fresh={ this.state.comment.SRSData.FreshPaper }
                weathered={ this.state.comment.SRSData.WeatheredPaper }
              />
              <SurveyTableRow 
                name='Filmed Plastic'
                fresh={ this.state.comment.SRSData.FreshFplastic }
                weathered={ this.state.comment.SRSData.WeatheredFplastic }
              />
              <SurveyTableRow 
                name='Misc. Plastic'
                fresh={ this.state.comment.SRSData.FreshMiscPlastic }
                weathered={ this.state.comment.SRSData.WeatheredMiscPlastic }
              />
              <SurveyTableRow 
                name='Plastic Bottle'
                fresh={ this.state.comment.SRSData.FreshPlasticBottle }
                weathered={ this.state.comment.SRSData.WeatheredPlasticBottle }
              />
              <SurveyTableRow 
                name='Plastic Cap'
                fresh={ this.state.comment.SRSData.FreshPlasticCap }
                weathered={ this.state.comment.SRSData.WeatheredPlasticCap }
              />
              <SurveyTableRow 
                name='Styrofoam'
                fresh={ this.state.comment.SRSData.FreshStyrofoam }
                weathered={ this.state.comment.SRSData.WeatheredStyrofoam }
              />
              <SurveyTableRow 
                name='Wood'
                fresh={ this.state.comment.SRSData.FreshWood }
                weathered={ this.state.comment.SRSData.WeatheredWood }
              />
              <SurveyTableRow 
                name='Urethane Foam'
                fresh={ this.state.comment.SRSData.FreshUrethaneFoam }
                weathered={ this.state.comment.SRSData.WeatheredUrethaneFoam }
              />
              <SurveyTableRow 
                name='Plastic Cup'
                fresh={ this.state.comment.SRSData.FreshPlasticCup }
                weathered={ this.state.comment.SRSData.WeatheredPlasticCup }
              />
              <SurveyTableRow 
                name='Plastic Straw'
                fresh={ this.state.comment.SRSData.FreshPlasticStraw }
                weathered={ this.state.comment.SRSData.WeatheredPlasticStraw }
              />
              <SurveyTableRow 
                name='Cotton/Cloth'
                fresh={ this.state.comment.SRSData.FreshCottonCloth }
                weathered={ this.state.comment.SRSData.WeatheredCottonCloth }
              />
              <SurveyTableRow 
                name='Polypropylene Rope'
                fresh={ this.state.comment.SRSData.FreshPolyRope }
                weathered={ this.state.comment.SRSData.WeatheredPolyRope }
              />
              <SurveyTableRow 
                name='Aluminum Can'
                fresh={ this.state.comment.SRSData.FreshAlumCan }
                weathered={ this.state.comment.SRSData.WeatheredAlumCan }
              />
              <SurveyTableRow 
                name='Hygiene Items'
                fresh={ this.state.comment.SRSData.FreshHygItems }
                weathered={ this.state.comment.SRSData.WeatheredHygItems }
              />
              <SurveyTableRow 
                name='Metal'
                fresh={ this.state.comment.SRSData.FreshMetal }
                weathered={ this.state.comment.SRSData.WeatheredMetal }
              />
              <SurveyTableRow 
                name='Tile/Brick'
                fresh={ this.state.comment.SRSData.FreshTileBrick }
                weathered={ this.state.comment.SRSData.WeatheredTileBrick }
              />
            </tbody>
          </table>

          <h3>Accumulation Survey</h3>
          <table className="uk-table uk-table-striped">
            <thead>
              <tr>
                <th>Debris Type</th>
                <th>Amount Fresh</th>
                <th>Amount Weathered</th>
              </tr>
            </thead>
            {/* when switch to array schema of debris, will be able to use map to programatically add rows */}
            {/* Same for accumulation survey */}
            <tbody>
              <SurveyTableRow 
                name='Cigarette Butt'
                fresh={ this.state.comment.ASData.FreshCig }
                weathered={ this.state.comment.ASData.WeatheredCig }
              />
              <SurveyTableRow 
                name='Fishing Line'
                fresh={ this.state.comment.ASData.FreshFline }
                weathered={ this.state.comment.ASData.WeatheredFline }
              />
              <SurveyTableRow 
                name='Glass'
                fresh={ this.state.comment.ASData.FreshGlass }
                weathered={ this.state.comment.ASData.WeatheredGlass }
              />
              <SurveyTableRow 
                name='Paper'
                fresh={ this.state.comment.ASData.FreshPaper }
                weathered={ this.state.comment.ASData.WeatheredPaper }
              />
              <SurveyTableRow 
                name='Filmed Plastic'
                fresh={ this.state.comment.ASData.FreshFplastic }
                weathered={ this.state.comment.ASData.WeatheredFplastic }
              />
              <SurveyTableRow 
                name='Misc. Plastic'
                fresh={ this.state.comment.ASData.FreshMiscPlastic }
                weathered={ this.state.comment.ASData.WeatheredMiscPlastic }
              />
              <SurveyTableRow 
                name='Plastic Bottle'
                fresh={ this.state.comment.ASData.FreshPlasticBottle }
                weathered={ this.state.comment.ASData.WeatheredPlasticBottle }
              />
              <SurveyTableRow 
                name='Plastic Cap'
                fresh={ this.state.comment.ASData.FreshPlasticCap }
                weathered={ this.state.comment.ASData.WeatheredPlasticCap }
              />
              <SurveyTableRow 
                name='Styrofoam'
                fresh={ this.state.comment.ASData.FreshStyrofoam }
                weathered={ this.state.comment.ASData.WeatheredStyrofoam }
              />
              <SurveyTableRow 
                name='Wood'
                fresh={ this.state.comment.ASData.FreshWood }
                weathered={ this.state.comment.ASData.WeatheredWood }
              />
              <SurveyTableRow 
                name='Urethane Foam'
                fresh={ this.state.comment.ASData.FreshUrethaneFoam }
                weathered={ this.state.comment.ASData.WeatheredUrethaneFoam }
              />
              <SurveyTableRow 
                name='Plastic Cup'
                fresh={ this.state.comment.ASData.FreshPlasticCup }
                weathered={ this.state.comment.ASData.WeatheredPlasticCup }
              />
              <SurveyTableRow 
                name='Plastic Straw'
                fresh={ this.state.comment.ASData.FreshPlasticStraw }
                weathered={ this.state.comment.ASData.WeatheredPlasticStraw }
              />
              <SurveyTableRow 
                name='Cotton/Cloth'
                fresh={ this.state.comment.ASData.FreshCottonCloth }
                weathered={ this.state.comment.ASData.WeatheredCottonCloth }
              />
              <SurveyTableRow 
                name='Polypropylene Rope'
                fresh={ this.state.comment.ASData.FreshPolyRope }
                weathered={ this.state.comment.ASData.WeatheredPolyRope }
              />
              <SurveyTableRow 
                name='Aluminum Can'
                fresh={ this.state.comment.ASData.FreshAlumCan }
                weathered={ this.state.comment.ASData.WeatheredAlumCan }
              />
              <SurveyTableRow 
                name='Hygiene Items'
                fresh={ this.state.comment.ASData.FreshHygItems }
                weathered={ this.state.comment.ASData.WeatheredHygItems }
              />
              <SurveyTableRow 
                name='Metal'
                fresh={ this.state.comment.ASData.FreshMetal }
                weathered={ this.state.comment.ASData.WeatheredMetal }
              />
              <SurveyTableRow 
                name='Tile/Brick'
                fresh={ this.state.comment.ASData.FreshTileBrick }
                weathered={ this.state.comment.ASData.WeatheredTileBrick }
              />
            </tbody>
          </table>
           
          {/* <span dangerouslySetInnerHTML={ this.rawMarkup() } /> */}
          {/* <Link to={{
            pathname: '/survey',
            state: { initialValues: this.state.comment },
          }}>
            update
          </Link> */}
          {/* <button onClick={ this.deleteComment }>delete</button> */}
        </div>
      )
    );
  }
}

export default Survey;
