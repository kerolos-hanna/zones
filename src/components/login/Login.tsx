import React, {useEffect} from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

import './login.css';

interface ILoginProps extends RouteComponentProps {
    loginData: { username: string, password: string };
    handleChange(e: React.FormEvent<HTMLInputElement>): void
};

const Login: React.FC<ILoginProps> = (props) => {
    useEffect(() => {
        /*const token = window.localStorage.getItem("access-token")
        if (token) {
            console.log("props: ", props)
            props.history.push("/")
        }*/
    }, [])
    const {loginData, handleChange} = props;
    const submitHandle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("https://zones-backend-halan.herokuapp.com/login", {
            username: loginData.username,
            password: loginData.password
        }).then((res) => {
                console.log(res);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                // @ts-ignore
                const {token} = res.data;
                window.localStorage.setItem("access-token", token);
                props.history.push("/")
            }
        ).catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        })
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

export default withRouter<ILoginProps, any>(Login)