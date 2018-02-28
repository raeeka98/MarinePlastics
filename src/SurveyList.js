import React, { Component } from 'react';
import Survey from './Survey';
import style from './style';

class SurveyList extends Component {
  render() {
    let surveyNodes = this.props.data.map(comment => {
      return (

        <Survey
        leader={comment.leader}
        surveyorNames={comment.surveyorNames}
        contactInfo={comment.contactInfo}
        date={comment.date}
        reason={comment.reason}
        beach={comment.beach}
        st={comment.st}
        lat={comment.lat}
        lon={comment.lon}
        slope={comment.slope}
        nroName={comment.nroName}
        nroDist={comment.nroDist}
        nroFlow={comment.nroFlow}
        nroOut={comment.nroOut}
        aspect={comment.aspect}
        weather={comment.weather}
        lastTide={comment.lastTide}
        nextTide={comment.nextTide}
        windDir={comment.windDir}
        majorUse={comment.majorUse}
        uniqueID={ comment['_id'] }
        onCommentDelete={ this.props.onCommentDelete }
        onCommentUpdate={ this.props.onCommentUpdate }
        key={ comment.id }>
        &nbsp;
        </Survey>

        )
      })
      return (
      <div style={ style.commentList }>
      { surveyNodes }
      </div>
      )
    }
  }

  export default SurveyList;
