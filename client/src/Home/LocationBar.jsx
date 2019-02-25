import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';


// function LocationBar({ handleAccordionClick, location, entryNodes,path,entryString }) {
//     return (
//         <div className="uk-card uk-card-default uk-card-body uk-margin">
//             <div>
//                 <ul className="uk-list uk-margin-remove-bottom">
//                     <li>
//                         <span className="survey-bar uk-accordion-title" onClick={handleAccordionClick}>
//                             {location.n}
//                             <span className="uk-text-muted uk-text-small uk-margin-left">
//                                 {location.numOfSurveys} {entryString}
//                             </span>
//                         </span>
//                         <div className="uk-accordion-content" style={{ display: 'none' }}>
//                             <ul className="uk-list uk-list-bullet uk-padding-remove-left">
//                                 {/*entryNodes*/}
//                             </ul>
//                             <p>
//                         <Link to={{ pathname: `/location/${path}`, state: { data: location } }}>
//                                     View location page
//                         </Link>
//                             </p>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

class LocationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            surveys: []
        }
        this.getSurveysFromBeach = this.getSurveysFromBeach.bind(this);
        this.createHTMLForEntries = this.createHTMLForEntries.bind(this);
    };

    getSurveysFromBeach() {

        let beachID = this.props.location._id;
        console.log("entered getsurveys");
        console.log(beachID);
        let surveysHTML = [];
        axios.get('/beaches/' + beachID)
          .then(res => {
            console.log(res.data);
            for (let month of Object.keys(res.data)) {
                let survey = res.data[month]
                let surveyHTML = this.createHTMLForEntries(survey);
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
    createHTMLForEntries(survey) {
        let surveyID = survey.survey;
        let surveyDay = survey.day;
        return (
            <li key={`entry-${surveyID}`}>
                <Link className="uk-link-muted"
                to={{ pathname: `/surveys/${surveyID.replace(' ', '-')}`}}>
                    {surveyDay}
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
        <div className="uk-card uk-card-default uk-card-body uk-margin">
            <div>
                <ul className="uk-list uk-margin-remove-bottom">
                    <li>
                        <span className="survey-bar uk-accordion-title" onClick={this.handleAccordionClick}>
                            {this.props.location.n}
                            <span className="uk-text-muted uk-text-small uk-margin-left">
                                {this.props.location.numOfSurveys} {this.props.entryString}
                            </span>
                        </span>
                        <div className="uk-accordion-content" style={{ display: 'none' }}>
                            <ul className="uk-list uk-list-bullet uk-padding-remove-left">
                                {this.state.surveys}
                            </ul>
                            <p>
                        <Link to={{ pathname: `/location/${this.props.path}`, state: { data: this.props.location } }}>
                                    View location page
                        </Link>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
    }
}
export default LocationBar;