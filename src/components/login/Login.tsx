import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {login} from '../../store/actions/actionCreators'
import {State} from "../../store/store";
import './login.css';

interface ILoginProps extends RouteComponentProps {
    loginData: { username: string, password: string };
    handleChange(e: React.FormEvent<HTMLInputElement>): void
    loginHandler(loginData: { username: string, password: string }): void;
    token: string
}

const Login: React.FC<ILoginProps> = (props) => {
    const {loginData, handleChange, loginHandler, token} = props;
    useEffect(() => {
        if (token) {
            props.history.push("/")
        }
    }, [props.history, token])
    const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginHandler(loginData);
    }
    return (
        <div className="container">
            <div className="parent">
                <div className="panel panel-login">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-xs-6">
                                <h2 id="login-form-link">Login</h2>
                            </div>
                        </div>
                        <hr/>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-12">
                                <form id="login-form" onSubmit={submitHandle}>
                                    <div className="form-group">
                                        <input type="text" name="username" id="username"
                                               className="form-control" placeholder="Username"
                                               value={loginData.username} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" id="password"
                                               className="form-control" placeholder="Password"
                                               value={loginData.password} onChange={handleChange}/>
                                    </div>
                                    <div className="form-group">
                                            <button className="btn-login">Log In</button>
                                    </div>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="text-center">
                                                    <a href="/#"
                                                       className="forgot-password">Forgot Password?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: State) => {
    return {
        token: state.login.token
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        loginHandler: (loginData: { username: string; password: string; }) => dispatch<any>(login(loginData)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter<ILoginProps, any>(Login))