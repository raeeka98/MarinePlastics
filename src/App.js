import React from 'react';
import Header from './Header/Header';
import SurveyBox from './Survey/SurveyBox';

const App = () => (
    <div>
        <Header />
        <SurveyBox
            url='http://localhost:3001/api/comments'
            pollInterval={2000} 
        />
    </div>
)

export default App;
