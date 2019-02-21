import React, { Component } from 'react';

class SurveyArea extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <li>
          <a className="uk-accordion-title" href="#surveyarea">Survey Area</a>
          <div class="uk-accordion-content">
              <p>Survey Area test</p>
          </div>
      </li>
    )
  }

}

export default SurveyArea
