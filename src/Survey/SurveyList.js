import React, { Component } from 'react';
import Survey from './Survey';
import style from '../style';

class SurveyList extends Component {
  render() {
    let commentNodes = this.props.data.map(comment => {
      return (
        <Survey
          beach={ comment.beach }
          uniqueID={ comment['_id'] }
          onCommentDelete={ this.props.onCommentDelete }
          onCommentUpdate={ this.props.onCommentUpdate }
          key={ comment._id }>
          {comment.reason}
          {comment.st}
          {comment.lat}
          {comment.lon}
          {comment.slope}
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
