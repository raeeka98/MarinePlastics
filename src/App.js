import React from 'react';
import SurveyBox from './Survey/SurveyBox';

const App = () => (
    <div>
        <SurveyBox
            url='http://localhost:3001/api/comments'
            pollInterval={2000} 
        />
    </div>
)

export default App;
