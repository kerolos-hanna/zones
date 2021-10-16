import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';
import {connect} from 'react-redux'
import {State} from "../../store/store";

export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
} & RouteProps;

const PrivateRoute: React.FC<ProtectedRouteProps> = (props) => {
    const {isAuthenticated, authenticationPath, ...routeProps} = props;
    console.log(props)
    if (isAuthenticated) {
        return <Route {...routeProps}/>
    }else{
        return <Redirect to={{ pathname: authenticationPath, state: {from: props.location} }} />;
    }
}

const mapStateToProps = (state: State) => {
    return {
        isAuthenticated: state.login.isAuthenticated
    }
}

export default connect(mapStateToProps)(PrivateRoute)