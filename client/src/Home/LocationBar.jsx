import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

class LocationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            surveys: []
        }
        this.getSurveysFromBeach = this.getSurveysFromBeach.bind(this);
        this.createHTMLForEntries = this.createHTMLForEntries.bind(this);
    };
    
    // Called when a user expands the accordion
    // Fetches surveys listed under the beach that is clicked
    getSurveysFromBeach() {
    
        let beachID = this.props.location._id;
        let surveysHTML = [];
        
        axios.get('/beaches/' + beachID)
          .then(res => {

            // For every month returned by the get request, render html that links to survey page
            // Then append that html to the surveysHTML array, which is then updated to the state
            for (let month of Object.keys(res.data)) {
                let survey = res.data[month]
                let surveyHTML = this.createHTMLForEntries(month, survey);
                surveysHTML.push(surveyHTML);
               
            }
            this.setState({
                surveys: surveysHTML
            })

          })
          .catch(err => {
            console.log(err);
          })
      }

    // returns HTML for every entry in the sorted array of locations
    // should display date and contain a link to specific survey page
    createHTMLForEntries(month, survey) {
        let surveyID = survey.survey;
        let surveyDay = survey.day;
        console.log(this.props.location.n);
        return (
            <li key={`entry-${surveyID}`}>
                <Link className="uk-link-muted"
                to={{ pathname: `/surveys/${surveyID.replace(' ', '-')}`,
                        state: {beachName: this.props.location.n, surveyID: surveyID} }}>
                    
                    {parseInt(month)+1}/{surveyDay}
                </Link>
            </li>
        );
    }

    handleAccordionClick = (e) => {
        console.log("handleAccordionClick");

        this.getSurveysFromBeach();

        let accordionWrapper = e.target.parentElement;
        let accordionContent = e.target.nextSibling;
        if (e.target.classList.contains('uk-text-muted')) {
          accordionWrapper = e.target.parentElement.parentElement;
          accordionContent = e.target.parentElement.nextSibling;
        }
    
        if (accordionWrapper.classList.contains('uk-open')) {
          accordionWrapper.classList.remove('uk-open');
          accordionContent.style.display = 'none';
        } else {
          accordionWrapper.classList.add('uk-open');
          accordionContent.style.display = 'block';
        }
    }

    render() { 
        return (
        <div className="uk-card uk-card-default uk-card-body uk-margin ">
            <div>
                <ul className="uk-accordion uk-margin-remove-bottom"  onClick={this.handleAccordionClick}>
                    <li>
                        <span className="survey-bar uk-accordion-title uk-margin-remove-bottom">
                        <Link to={{ pathname: `/location/${this.props.path}`, state: { data: this.props.location } }} style={{ textDecoration: 'none', color: 'black'  }}>
                            {this.props.location.n}
                            </Link>
                            <span className="uk-text-muted uk-text-small uk-margin-remove-bottom">
                                {this.props.location._numOfSurveys} {this.props.entryString}
                            </span>
                        </span>
                        <div className="uk-accordion-content" style={{ display: 'none' }}>
                        <p>
                        <Link to={{ pathname: `/location/${this.props.path}`, state: { data: this.props.location } }}>
                                    Go to location page
                        </Link>
                            </p>
                            <ul className="uk-list uk-list-bullet uk-padding-remove-left">
                                {this.state.surveys}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
    }
}
export default LocationBar;