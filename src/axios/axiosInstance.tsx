import axios from "axios";


const instance = axios.create({
    baseURL: "https://zones-backend-halan.herokuapp.com/"
})

const accessToken = window.localStorage.getItem("access-token");
if(accessToken){
    // @ts-ignore
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
}

export default instance;