import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Auth from '../Auth';

import AccumulationSurvey from './SurveySubsections/AccumulationSurvey';
import MicroDebrisSurvey from './SurveySubsections/MicroDebrisSurvey';
import SurfaceRibScan from './SurveySubsections/SurfaceRibScan';
import SurveyArea from './SurveySubsections/SurveyArea';
import TeamInformation from './SurveySubsections/TeamInformation';
import Totals from './SurveySubsections/Totals';
import Review from './SurveySubsections/Review';

import {
    Accordion,
} from 'react-accessible-accordion';

import './accordion-styles.css';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import { runInThisContext } from 'vm';

class SurveyForm extends Component {
    constructor(props) {
        super(props);
        this.url = '/surveys'
        this.auth = this.props.auth;
        this.state = {
            surveyData: {
                // fields (id's) :
                // TI: userFirst, userLast, orgName, orgLoc, email, cleanUpTime, cleanUpDate
                // SA: beachName, latitude, longitude,
                //     {usageRecreation, usageCommercial, usageOther}
                //     {locationChoiceProximity, locationChoiceDebris, locationChoiceOther}
                //     compassCardinal, compassDegrees, riverName, riverDistance,
                //     {tideTypeB, tideHeightB, tideTimeB},
                //     {tideTypeA, tideHeightA, tideTimeA},
                //     windSpeed, windDir,
                //     {substrateTypeSand, substrateTypePebble, substrateTypeRipRap, substrateTypeSeaweed, substrateTypeOther},
                //
                // SRS: rib1Start, rib2Start, rib3Start, rib4Start, rib1End, rib2End, rib3End, rib4End
                //
                //
                //
                //
            },
            SRSData: {
                // format for debris is: trash_id + ("FreshRib" | "WeatheredRib") + ribNumber
            },
            ASData: {
                // format for debris is: trash_id + "accumulation" + ("Fresh | Weathered | Total")
            },
            displayStrings: {
                usage: "",
                locChoice: "",
                subType: ""
            },
            isInputting: true,
            isReviewing: false,
            isSubmitted: false,
            user: "",
            email: "",
            userID: ""
        }
        this.moveToReview = this.moveToReview.bind(this);
        this.moveToInput = this.moveToInput.bind(this);
        this.moveToSubmit = this.moveToSubmit.bind(this);
        this.updateSurveyState = this.updateSurveyState.bind(this);
        this.updateCheckedState = this.updateCheckedState.bind(this);
        this.prepareForm = this.prepareForm.bind(this);
        this.updateSRS = this.updateSRS.bind(this);
        this.updateAS = this.updateAS.bind(this);
    }

    componentDidMount() {
        // check if user is authenticated (redirect if not)
        if (!this.auth.isAuthenticated()) {
            window.alert('Please sign in to continue');
            window.location.replace('/');
        }

        // set entry user/email from auth0
        this.auth.getLoggedInProfile((err, profile) => {
            this.setState({
                user: profile.name,
                email: profile.email,
                userID: profile.sub.split("|")[1]
            });
        });
    }

    updateDisplayStrings() {
        const data = this.state.surveyData;

        let usage = {
            rec: data.usageRecreation ? data.usageRecreation : undefined,
            com: data.usageCommercial ? data.usageCommercial : undefined,
            other: data.usageOther ? data.usageOther : undefined
        }

        let locChoice = {
            debris: data.locationChoiceDebris ? data.locationChoiceDebris : undefined,
            prox: data.locationChoiceProximity ? data.locationChoiceProximity : undefined,
            other: data.locationChoiceOther ? data.locationChoiceOther : undefined
        }

        let subType = {
            s: data.substrateTypeSand ? data.substrateTypeSand : false,
            p: data.substrateTypePebble ? data.substrateTypePebble : false,
            rr: data.substrateTypeRipRap ? data.substrateTypeRipRap : false,
            sea: data.substrateTypeSeaweed ? data.substrateTypeSeaweed : false,
            other: data.substrateTypeOther ? data.substrateTypeOther : undefined

        }

        this.setState({
            displayStrings: {
                usage: usage,
                locChoice: locChoice,
                subType: subType
            }
        })
    }

    // returns ID's of invalid elements if invalid, if not, returns empty array;
    validate() {
        let invalid = [];

        const displayIDs = {
            userFirst: "First name",
            userLast: "Last name",
            orgName: "Organization Name",
            orgLoc: "Organization Location",
            cleanUpTime: "Clean Up Time",
            cleanUpDate: "Clean Up Start Time",
            beachName: "Name of Beach",
            latitude: "Latitude",
            longitude: "Longitude",
            compassDegrees: "Compass Degrees",
            riverName: "River Name",
            riverDistance: "Nearest River Output Distance",
            usage: "Usage",
            locChoice: "Reason for Location Choice",
            subType: "Substrate Type",
            slope: "Slope",
            tideHeightA: "Next Tide Height",
            tideTimeA: "Next Tide Time",
            tideTypeA: "Next Tide Type",
            tideHeightB: "Last Tide Height",
            tideTypeB: "Last Tide Type",
            tideTimeB: "Last Tide Time",
            windDir: "Wind Direction",
            windSpeed: "Wind Speed"

        }

        const requiredIDs = ['userFirst', 'userLast', 'orgName', 'orgLoc',
            'cleanUpTime', 'cleanUpDate', 'beachName',
            'latitude', 'longitude', 'compassDegrees', 'riverName', 
            'riverDistance', 'slope', 'tideHeightA', 'tideHeightB', 'tideTimeA',
            'tideTimeB', 'tideTypeA', 'tideTypeB', 'windDir', 'windSpeed'
        ];


        //Things in survey
        for (const id of requiredIDs) {
            if (!this.state.surveyData[id]) {
                invalid.push(displayIDs[id]);
            }
        }
        
        //Check for usage
        if(!this.state.surveyData.usageRecreation 
            && !this.state.surveyData.usageCommercial 
                && !this.state.surveyData.usageOther)
                invalid.push(displayIDs.usage);
        
        //Check if the user filled out the reason for location choice
        if(!this.state.surveyData.locationChoiceDebris && !this.state.surveyData.locationChoiceProximity
            && !this.state.surveyData.locationChoiceOther)
            invalid.push(displayIDs.locChoice);
        
        // Check if the user filled out the substrate type
        if(!this.state.surveyData.substrateTypeSand && !this.state.surveyData.substrateTypePebble && !this.state.surveyData.substrateTypeRipRap
            && !this.state.surveyData.substrateTypeSeaweed && !this.state.surveyData.substrateTypeOther)
            invalid.push(displayIDs.subType);


        return invalid;
    }


    navToID(ids) {
        alert("Please fill out the following: " + ids)
    }

    moveToReview() {
        const invalidInput = this.validate();
        console.log(invalidInput);
        if (invalidInput && invalidInput.length) {
            this.navToID(invalidInput);
        } else {
            this.updateDisplayStrings();
            this.setState({
                isInputting: false,
                isReviewing: true,
                isSubmitted: false,
            })
        }
    }

    moveToInput() {
        this.setState({
            isInputting: true,
            isReviewing: false,
            isSubmitted: false
        })
    }

    moveToSubmit() {
        const form = this.prepareForm();
        console.log(form);

        axios.post("beaches/surveys", form)
            .then(res => {
                console.log(res.data.survID);
                if (res.data.survID) {
                    this.setState({
                        isInputting: false,
                        isReviewing: false,
                        isSubmitted: true
                    })
                }
            })
            .catch(err => {
                console.log("We caught an error");
                console.log(err.response);
                alert(err.response.data.error.details[0].message);
            })
    }



    toTitleCase(word) {
        return word.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };

    calcTotalsSRS() {
        let totals = {};
        let totalsArray = [];

        const data = this.state.SRSData;

        for (const id in data) {
            const noNum = id.replace(/__[1-4]/, '');
            const trash_id = noNum.replace(/__\w+/, '');
            const type = noNum.replace(/\w+__/, '');
            if (!totals[trash_id]) {
                totals[trash_id] = {
                    fresh: 0,
                    weathered: 0
                }
            }
            if (type === "weathered") {
                totals[trash_id].weathered = totals[trash_id].weathered + parseInt(data[id]);
            } else {
                totals[trash_id].fresh = totals[trash_id].fresh + parseInt(data[id]);
            }
        }
        for (const id in totals) {
            totalsArray.push([
                id,
                { fresh: totals[id].fresh, weathered: totals[id].weathered }
            ]);
        }
        return totalsArray;
    }

    calcTotalsAS() {
        let totals = {};
        let totalsArray = [];

        const data = this.state.ASData;

        for (const id in data) {
            const noAcc = id.replace(/__accumulation/i, '');
            const trash_id = noAcc.replace(/__\w+/, '');
            const type = noAcc.replace(/\w+__/, '');
            console.log(trash_id);
            console.log(type);
            if (!totals[trash_id]) {
                totals[trash_id] = {
                    fresh: 0,
                    weathered: 0
                }
            }
            if (type === "weathered") {
                totals[trash_id].weathered = totals[trash_id].weathered + parseInt(data[id]);
            } else {
                totals[trash_id].fresh = totals[trash_id].fresh + parseInt(data[id]);
            }
        }
        for (const id in totals) {
            totalsArray.push([
                id,
                { fresh: totals[id].fresh, weathered: totals[id].weathered }
            ]);
        }
        return totalsArray;
    }

    prepareForm() {
        // for that visual AESTHETIC

        const data = this.state.surveyData;
        const show = this.state.displayStrings;
        let date = new Date(data.cleanUpDate);
        const min = parseInt(data.cleanUpTime.replace(/[0-9]+:/, ''));
        const hr = parseInt(data.cleanUpTime.replace(/:[0-9]+/, ''));

        date = parseInt(date.valueOf()) + (((hr * 60) + min) * 100000);
        console.log(date);
        const form = {
            survData: {
                user: {
                    f: (data.userFirst ? data.userFirst : ""),
                    l: (data.userLast ? data.userLast : "")
                },
                email: this.state.email,
                userID: this.state.userID,
                org: (data.orgName ? data.orgName : ""),
                reason: (show.locChoice ? show.locChoice : "No reason"),
                survDate: new Date(data.cleanUpDate + "T" + data.cleanUpTime),
                st: (show.subType ? show.subType : ""),
                slope: (data.slope ? data.slope : ""),
                cmpsDir: (data.compassDegrees ? data.compassDegrees : 100),
                lastTide: {
                    type: (data.tideTypeB ? data.tideTypeB : ""),
                    time: (data.tideTimeB ? data.tideTimeB : ""),
                    height: (data.tideHeightB ? data.tideHeightB : "")
                },
                nextTide: {
                    type: (data.tideTypeA ? data.tideTypeA : ""),
                    time: (data.tideTimeA ? data.tideTimeA : ""),
                    height: (data.tideHeightA ? data.tideHeightA : "")
                },
                wind: {
                    dir: (data.windDir ? data.windDir : ""),
                    spd: (data.windSpeed ? data.windSpeed : "")
                },
                majorUse: (show.usage ? show.usage : ""),
                // weight: (data.weight ? data.weight : ""),
                /* SRSDebris: [
                    [cigaretteButts, {
                        fresh (total):
                        weathered (total):
                    }],
                    ...
                ]
                */
                numOfP: 0,
                SRSDebris: this.calcTotalsSRS(),
                ASDebris: this.calcTotalsAS(),
            },
            bID: data.beachID ? data.beachID : undefined,
            beachData: data.beachID ? undefined : {
                n: data.beachName.replace(/\s/g, "_"),
                lat: data.latitude,
                lon: data.longitude,
                nroName: data.riverName.replace(/\s/g, "_"),
                nroDist: data.riverDistance
            }
        }

        return form;
    }

    //alternative
    setSurveyData = (key, val) => {
        this.setState(prevState => { prevState.surveyData[key] = val; return prevState });
    }

    updateSurveyState(e) {
        const key = e.target.id;
        const val = e.target.value;
        this.setState(prevState => {
            prevState.surveyData[key] = val
            return prevState;
        })
    }

    updateCheckedState(e) {
        const key = e.target.id;
        const val = e.target.checked;
        this.setState(prevState => {
            prevState.surveyData[key] = val;
            return prevState;
        })
    }

    updateSRS(e) {
        const key = e.target.id;
        const val = e.target.value;
        this.setState(prevState => {
            prevState.SRSData[key] = val;
            return prevState;
        })
    }

    updateAS(e) {
        const key = e.target.id;
        const val = e.target.value;
        this.setState(prevState => {
            prevState.ASData[key] = val;
            return prevState;
        })
    }

    inputting = () => {
        return (
            <div>
                <form id="surveyForm">
                    <Accordion>
                        <TeamInformation data={this.state.surveyData} updateSurveyState={this.updateSurveyState} />
                        <SurveyArea data={this.state.surveyData} setSurveyData={this.setSurveyData} updateSurveyState={this.updateSurveyState} updateCheckedState={this.updateCheckedState} />
                        <SurfaceRibScan data={this.state.surveyData} SRSData={this.state.SRSData} updateSurveyState={this.updateSurveyState} updateSRS={this.updateSRS} />
                        <AccumulationSurvey data={this.state.ASData} updateAS={this.updateAS} />
                        <MicroDebrisSurvey data={this.state.surveyData} updateSurveyState={this.updateSurveyState} />
                    </Accordion>
                </form>
                <div className="submit-button-container" >
                    <button className="uk-button uk-button-secondary" onClick={this.moveToReview} >Review</button>
                </div>
            </div>
        );

    }

    reviewing = () => {
        return (
            <div>
                <button className="uk-button uk-button-secondary" onClick={this.moveToInput} >Back to Input</button>
                <Review data={this.state.surveyData} email={this.state.email}SRSData={this.state.SRSData} ASData={this.state.ASData} displayStrings={this.state.displayStrings} />
                <button className="uk-button uk-button-disabled" onClick={this.moveToSubmit}>Submit </button>
            </div>);
    }

    submitting = () => {
        return (
            <div>
                <h1>Your survey was successfully submitted!</h1>
                <h3>Click <Link to="/home" > here</Link> to view your survey.</h3>
                <div className="submit-button-container">
                    <button className="uk-button uk-button-secondary" onClick={this.moveToReview} >
                        Back to Review
                    </button>
                </div>
            </div>
        );
    }


    render() {
        return (
            <div className="centering-container" >
                {(this.state.isInputting && this.inputting()) ||
                    (this.state.isReviewing && this.reviewing()) ||
                    (this.state.isSubmitted && this.submitting())}
            </div>
        );
    }
}

export default SurveyForm;