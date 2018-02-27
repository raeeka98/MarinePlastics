import React from 'react';
import ReactDOM from 'react-dom';
import SurveyBox from './SurveyBox';

ReactDOM.render(
  <SurveyBox
    url='http://localhost:3001/api/comments'
    pollInterval={2000} />,
  document.getElementById('root')
);
