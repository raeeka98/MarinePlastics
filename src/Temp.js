import React from 'react';
import SurveyBox from './Survey/SurveyBox';

const temp = () => (
    <SurveyBox
        url='http://localhost:3001/api/comments'
        pollInterval={2000} 
    />
)

export default temp