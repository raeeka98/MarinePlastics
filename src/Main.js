import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Temp from './Temp';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Temp} />
        </Switch>
    </main>
)

export default Main
