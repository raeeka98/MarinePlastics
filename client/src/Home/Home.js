import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { locationSort, locationFind, debrisFind, userFind, orgFind } from "../_helpers/SortHelper";
import { getTotalPounds } from "../_helpers/ChartHelpers";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            rawData: [],
            searchResult: [],
            filter: "beach",
        };
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchTypeChange = this.handleSearchTypeChange.bind(this);
        this.pollInterval = null;
        this.url = "/surveys";
    }

    // gets the entries from the server, saves them in the state
    loadCommentsFromServer() {
        axios.get(this.url)
            .then(res => {
                res.data.sort((a, b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                });
                // sorts data into locations 
                const sorted = locationSort(res.data);
                this.setState({
                    data: sorted,
                    rawData: res.data,
                    searchResult: sorted,
                });
            });
    }

    handleSearchTypeChange(e){
        this.setState({ filter: e.target.value });
        this.handleSearch(document.getElementById("searchBar").value, e.target.value);
    }

    handleSearchChange(e) {
        this.handleSearch(e.target.value, this.state.filter);
    }

    handleSearch(value, filter) {
        if (value.length > 0) {
            if (filter === "beach") {
                const result = locationFind(this.state.data, value);
                this.setState({ searchResult: result });
            } else if (filter === "debris") {
                const result = debrisFind(this.state.rawData, value);
                this.setState({ searchResult: result });
            } else if (filter === "user") {
                const result = userFind(this.state.rawData, value);
                this.setState({ searchResult: result });
            } else if (filter === "org") {
                console.log("org");
                const result = orgFind(this.state.rawData, value);
                this.setState({ searchResult: result });
            } else {
                const allLocations = this.state.data;
                this.setState({ searchResult: allLocations });
            } 
        } else {
            const allLocations = this.state.data;
            this.setState({ searchResult: allLocations });
        }
    }

    // once the component is on the page, checks the server for comments
    componentDidMount() {
        this.loadCommentsFromServer();
    }

    render() {
    // returns HTML for every entry in the sorted array of locations
        let locationNodes = this.state.searchResult.map((location, i) => {
            let path = location.name ? location.name.replace(/\s/g, "") : "HELPPPPPPPPP";
            let entryString = location.entries.length > 1 ? "Entries" : "Entry";

            let entryNodes = location.entries.map((entry, i) => {
                // console.log(entry);
                return (
                    <li key={`entry-${i}`}>
                        <Link className="uk-link-muted" to={{ pathname: `/entry/${entry._id}` }}>
                            { entry.date }
                        </Link>
                    </li>
                );
            });

            let handleAccordionClick = (e) => {
                let accordionWrapper = e.target.parentElement;
                let accordionContent = e.target.nextSibling;
                if (e.target.classList.contains("uk-text-muted")) {
                    accordionWrapper = e.target.parentElement.parentElement;
                    accordionContent = e.target.parentElement.nextSibling;
                }

                if (accordionWrapper.classList.contains("uk-open")) {
                    accordionWrapper.classList.remove("uk-open");
                    accordionContent.style.display = "none";
                } else {
                    accordionWrapper.classList.add("uk-open");
                    accordionContent.style.display = "block";
                }
            };

            return (
                <div className="uk-card uk-card-default uk-card-body uk-margin" key={i}>
                    <div>
                        <ul className="uk-list uk-margin-remove-bottom">
                            <li id={`accordion${i}`}>
                                <a className="uk-accordion-title" onClick={ handleAccordionClick }>
                                    { location.name }
                                    <span className="uk-text-muted uk-text-small uk-margin-left">
                                        { location.entries.length } { entryString }
                                    </span>
                                </a>
                                <div className="uk-accordion-content" style={{ display: "none" }}>
                                    <ul className="uk-list uk-list-bullet uk-padding-remove-left">
                                        { entryNodes } 
                                    </ul>
                                    <p>
                                        <Link to={{ pathname: `/location/${path}`, state: { data: location } }}>
                      View location page
                                        </Link>
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            );
        });

        let totalWeight = getTotalPounds(this.state.rawData);

        return (
            <div>
                <div className="uk-width-2-3 uk-align-center uk-margin-top">
                    <form className="uk-grid uk-grid-small uk-margin-small-bottom">
                        <div className="uk-width-2-3">
                            <input
                                className="uk-input uk-form-large"
                                id="searchBar"
                                type="search"
                                onChange={ this.handleSearchChange } 
                                placeholder="Search..."
                            />
                        </div>
                        <div className="uk-width-1-3">
                            <select className="uk-select uk-form-large" id='type' onChange={ this.handleSearchTypeChange }>
                                <option value="beach">By Beach</option>
                                <option value="debris">By Debris</option>
                                <option value="user">By Team Leader</option>
                                <option value="org">By Organization</option>
                            </select>
                        </div>
                    </form>
                    <div id="locations" className="uk-background-muted uk-padding uk-height-large" style={{ overflowY: "scroll" }}>
                        { locationNodes }
                        { this.state.data.length < 1
                            ? <div>No Entries</div> : null
                        }
                    </div>
                    <div className="uk-section uk-section-primary uk-margin-top">
                        <div className="uk-container">
                            <h2 className="uk-text-center uk-heading">{totalWeight} pounds of marine debris picked up so far!</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
