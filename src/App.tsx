import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {LoginContainer} from "./containers/loginPage/Login";
import {PrivateRoute} from "./components/privateRoute/PrivateRoute";
import {ZonesPage} from './containers/zonesPage/Zones';

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <PrivateRoute path="/" component={ZonesPage} isAuthenticated={false} authenticationPath="/login" exact/>
                    <Route path="/login" component={LoginContainer} exact/>
                </Switch>
            </Router>
        </>
    );
}

export default App;
