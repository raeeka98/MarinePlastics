import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import marked from 'marked';
import Auth from '../Auth';
import axios from 'axios';

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
            <b>Surveyor Names: </b>
            <i>{this.state.comment.surveyorNames}</i>
          </p>
          <p>
            <b>Contact Information: </b>
            <i>{this.state.comment.email}</i>
          </p>
          <p>
            <b>Date: </b>
            <i>{this.state.comment.date}</i>
          </p>

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
          <h3>Surface Rib Scan Survey</h3>
           <p><b>Cig Butts </b><i>{this.state.comment.SRSData.FreshCig}</i>, <i>{this.state.comment.SRSData.WeatheredCig}</i></p>
            <p><b>Fishing Line </b><i>{this.state.comment.SRSData.FreshFline}</i>, <i>{this.state.comment.SRSData.WeatheredFline}</i></p>
            <p><b>Glass </b><i>{this.state.comment.SRSData.FreshGlass}</i>, <i>{this.state.comment.SRSData.WeatheredGlass}</i></p>
            <p><b>Paper </b><i>{this.state.comment.SRSData.FreshPaper}</i>, <i>{this.state.comment.SRSData.WeatheredPaper}</i></p>
            <p><b>Filmed Plastic </b><i>{this.state.comment.SRSData.FreshFplastic}</i>, <i>{this.state.comment.SRSData.WeatheredFplastic}</i></p>
            <p><b>Misc. Plastics </b><i>{this.state.comment.SRSData.FreshMiscPlastic}</i>, <i>{this.state.comment.SRSData.WeatheredMiscPlastic}</i></p>
            <p><b>Plastic Bottle </b><i>{this.state.comment.SRSData.FreshPlasticBottle}</i>, <i>{this.state.comment.SRSData.WeatheredPlasticBottle}</i></p>
            <p><b>Plastic Cap </b><i>{this.state.comment.SRSData.FreshPlasticCap}</i>, <i>{this.state.comment.SRSData.WeatheredPlasticCap}</i></p>
            <p><b>Styrofoam </b><i>{this.state.comment.SRSData.FreshStyrofoam}</i>, <i>{this.state.comment.SRSData.WeatheredStyrofoam}</i></p>
            <p><b>Wood </b><i>{this.state.comment.SRSData.FreshWood}</i>, <i>{this.state.comment.SRSData.WeatheredWood}</i></p>
            <p><b>Urethane Foam </b><i>{this.state.comment.SRSData.FreshUrethaneFoam}</i>, <i>{this.state.comment.SRSData.WeatheredUrethaneFoam}</i></p>
            <p><b>Plastic Cup </b><i>{this.state.comment.SRSData.FreshPlasticCup}</i>, <i>{this.state.comment.SRSData.WeatheredPlasticCup}</i></p>
            <p><b>Plastic Straw </b><i>{this.state.comment.SRSData.FreshPlasticStraw}</i>, <i>{this.state.comment.SRSData.WeatheredPlasticStraw}</i></p>
            <p><b>Cotton/Cloth </b><i>{this.state.comment.SRSData.FreshCottonCloth}</i>, <i>{this.state.comment.SRSData.WeatheredCottonCloth}</i></p>
            <p><b>Polypropylene Rope </b><i>{this.state.comment.SRSData.FreshPolyRope}</i>, <i>{this.state.comment.SRSData.WeatheredPolyRope}</i></p>
            <p><b>Aluminum Can </b><i>{this.state.comment.SRSData.FreshAlumCan}</i>, <i>{this.state.comment.SRSData.WeatheredAlumCan}</i></p>
            <p><b>Hygiene Items </b><i>{this.state.comment.SRSData.FreshHygItems}</i>, <i>{this.state.comment.SRSData.WeatheredHygItems}</i></p>
            <p><b>Metal </b><i>{this.state.comment.SRSData.FreshMetal}</i>, <i>{this.state.comment.SRSData.WeatheredMetal}</i></p>
            <p><b>Tile/Brick </b><i>{this.state.comment.SRSData.FreshTileBrick}</i>, <i>{this.state.comment.SRSData.WeatheredTileBrick}</i></p>


          {/* <span dangerouslySetInnerHTML={ this.rawMarkup() } /> */}
          {/* <Link to={{
            pathname: '/survey',
            state: { initialValues: this.state.comment },
          }}>
            update
          </Link> */}
          <button onClick={ this.deleteComment }>delete</button>
        </div>
      )
    );
  }
}

export default Survey;
