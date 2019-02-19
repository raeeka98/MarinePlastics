import React from "react";
import { Link } from 'react-router-dom';


function LocationBar({ handleAccordionClick, location, entryNodes,path,entryString }) {
    //console.log(location);
    return (
        <div className="uk-card uk-card-default uk-card-body uk-margin">
            <div>
                <ul className="uk-list uk-margin-remove-bottom">
                    <li>
                        <span className="survey-bar uk-accordion-title" onClick={handleAccordionClick}>
                            {location.name}
                            <span className="uk-text-muted uk-text-small uk-margin-left">
                                {location.entries.length} {entryString}
                            </span>
                        </span>
                        <div className="uk-accordion-content" style={{ display: 'none' }}>
                            <ul className="uk-list uk-list-bullet uk-padding-remove-left">
                                {entryNodes}
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
}
export default LocationBar;