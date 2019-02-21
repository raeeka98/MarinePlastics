import React, { Component } from 'react';

class TeamInformation extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <li>
          <a className="uk-accordion-title" href="#teaminfo">Team Information</a>
          <div class="uk-accordion-content">
              <p>Team Info test</p>
          </div>
      </li>
    )
  }

}

export default TeamInformation
