import React, { Component } from "react";
import { debrisNames } from '../NewSurveyForm/debrisInfo'


class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: null,
            addingnew: false
        }
    }

    addtoData = (e) => {
        this.props.addNewDebris(this.props.type,e.target.value);
        console.log("add to new");
        this.setState(prevState => ({
            addingnew: false,
            inProgress: null
        }));

    }
    removeInProgress = () => {
        this.setState(prevState => ({
            addingnew: false,
            inProgress: null
        }));
    }

    addtoRow = () => {
        let el = (
            <tr>
                <td className="editable">
                    <span className="minusBtn" onClick={this.removeInProgress}></span>
                    <select
                        className='uk-select uk-margin'
                        onChange={this.addtoData}>
                        <option default>Select One</option>
                        {this.props.options.map((val, i) =>
                            <option key={i} id={i} value={val}>{val}</option>
                        )}
                    </select>
                </td>
                <td><input type="number" defaultValue="0" disabled /> </td>
                <td><input type="number" defaultValue="0" disabled /> </td>
            </tr>
        );
        this.setState(prevState => ({
            inProgress: el,
            addingnew: true
        }))
    }

    render() {
        return (<div id={`${this.props.type}-section`} >
            <div className="uk-card uk-card-default uk-card-body">
                <h3>{this.props.type === "SRS" ? "Surface Rib Scan Survey" : "Accumulation Survey"}</h3>
                <table className="uk-table uk-table-striped tableEdit">
                    <thead>
                        <tr>
                            <th>Debris Type</th>
                            <th>Amount Fresh</th>
                            <th>Amount Weathered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.rows}
                        {this.state.inProgress}
                        {this.state.addingnew ? null : <tr id="plusBtn" onClick={this.addtoRow}></tr>}
                    </tbody>
                </table>
            </div>
        </div>);
    }
}


export default EditableTable;
