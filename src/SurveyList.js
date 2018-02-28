import React, { Component } from 'react';
import Survey from './Survey';
import style from './style';

class SurveyList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Survey
          leader={comment.leader}
          uniqueID={ comment['_id'] }
          onCommentDelete={ this.props.onCommentDelete }
          onCommentUpdate={ this.props.onCommentUpdate }
          key={ comment.id }>
          {comment.surveyorNames}
          {comment.contactInfo}
          {comment.date}
          {comment.reason}
          {comment.beach}
          {comment.st}
          {comment.lat}
          {comment.lon}
          {comment.slope}
          {comment.nroName}
          {comment.nroDist}
          {comment.nroFlow}
          {comment.nroOut}
          {comment.aspect}
          {comment.weather}
          {comment.lastTide}
          {comment.nextTide}
          {comment.windDir}
          {comment.majorUse}
        </Survey>
      )
    })
    return (
      <div style={ style.commentList }>
        { commentNodes }
      </div>
    )
  }
}

export default SurveyList;
