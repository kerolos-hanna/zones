// import axios from 'axios';
import axios from '../../axios/axiosInstance';
import {ActionTypes} from './actionTypes';
import {zoneAction, zone} from '../reducer/zonesReducer'
import Swal from "sweetalert2";
import {Dispatch} from "redux";
import {loginAction} from "../reducer/loginReducer";

export const login = (loginData: { username: string, password: string }) => {
    return (dispatch: Dispatch<loginAction>) => {
        axios.post("/login", {
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
                dispatch({type: ActionTypes.LOGIN_SUCCESS, payload: {token}})
                //props.history.push("/")
            }
        ).catch(err => {
            console.log(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
            dispatch({type: ActionTypes.LOGIN_FAILURE, payload: {token: ""}})
        })
    }
}

export const isStillLogin = (token: string) => {
    const action: loginAction = {
        type: ActionTypes.LOGIN_SUCCESS, payload: {token: token}
    }
    return (dispatch: Dispatch<loginAction>) => {
        dispatch(action)
    }
}

export const logout = () => {
    const action: loginAction = {
        type: ActionTypes.LOGOUT,
        payload: {token: ""}
    }
    window.localStorage.setItem("access-token", "")
    return (dispatch: Dispatch<loginAction>) => {
        dispatch(action);
    }
}

export const getAllZones = () => {
    return (dispatch: Dispatch<zoneAction>) => {
        axios.get("/zones", {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('access-token')}`
            }
        }).then(res => {
            console.log(res);
            // @ts-ignore
            dispatch({type: ActionTypes.GET_ZONES, payload: {zones: res.data.data}})
        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong when retrieving zones!',
            })
        })
    }
}

export const addZone = (zone: zone) => {
    const action: zoneAction = {
        type: ActionTypes.ADD_ZONE,
        payload: {
            zones: []
        }
    }
    return (dispatch: Dispatch<zoneAction>) => {
        axios.post("/zones", {
            label: zone.label,
            color: zone.color,
            points: zone.points
        }, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('access-token')}`
            }
        }).then(res => {
            console.log(res)
            dispatch(action)
            getAllZones()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Added',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong when adding a zone!',
            })
        })
    }
}

export const updateZone = (id: string | undefined, zone: zone) => {
    const action: zoneAction = {
        type: ActionTypes.UPDATE_ZONE,
        payload: {zones: []}
    }
    return (dispatch: Dispatch<zoneAction>) => {
        axios.put(`/zones/${id}`, {
            label: zone.label,
            color: zone.color,
            points: zone.points
        }, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('access-token')}`
            }
        }).then(res => {
            console.log(res)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Updated',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(action)
            // getAllZones()
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong when updating a zone!',
            })
        })
    }
}

export const deleteZone = (id: string | undefined) => {
    const action: zoneAction = {
        type: ActionTypes.REMOVE_ZONE,
        payload: {zones: []}
    }
    return (dispatch: Dispatch<zoneAction>) => {
        axios.delete(`/zones/${id}`, {
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('access-token')}`
            }
        }).then(res => {
            console.log(res)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Deleted',
                showConfirmButton: false,
                timer: 1500
            })
            dispatch(action)
            // getAllZones()
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        }).catch(err => {
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong when deleting a zone!',
            })
        })
    }
}