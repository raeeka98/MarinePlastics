import React, { Component } from 'react';
import axios from 'axios';
import './adminPage.css';

class AdminPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth,
            currentFoundUser:null
        };

    }

    render(){
        return (<p>hi</p>);
    }

}

export default AdminPage;