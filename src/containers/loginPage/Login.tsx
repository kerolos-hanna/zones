import React, {useState} from 'react';
import Login from "../../components/login/Login";

const LoginContainer = () => {
    const [state, setState] = useState({username: "", password: ""});
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setState({...state, [name]: value})
    }

    return (
        <Login loginData={state} handleChange={handleChange} />
    )
}

export {LoginContainer}