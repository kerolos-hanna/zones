import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Dispatch} from "redux";
import {connect} from 'react-redux';

import {LoginContainer} from "./containers/loginPage/Login";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ZonesPage from './containers/zonesPage/Zones';
import {isStillLogin} from "./store/actions/actionCreators";

interface IAppProps {
    stillLogin(token: string): void;
}

function App(props: IAppProps) {
    useEffect(() => {
        console.log("env: ", process.env.NODE_ENV)
        const token = window.localStorage.getItem("access-token")
        if (token) {
            props.stillLogin(token)
        }
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <Router>
                <Switch>
                    <PrivateRoute path="/" component={ZonesPage} authenticationPath="/login"
                                  exact/>
                    <Route path="/login" component={LoginContainer} exact/>
                </Switch>
            </Router>
        </>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        stillLogin: (token: string) => dispatch<any>(isStillLogin(token)),
    }
}

export default connect(null, mapDispatchToProps)((App));
