import axios from 'axios';
import { APP_CONFIG } from '../src/config/app.constant';

export const callAPI = (endpoint: string, method: string, body: any) => {
    return axios({
        url: (APP_CONFIG.HOST || window.location.origin ) + "/api/" + endpoint,
        method: method ? method : "GET",
        data: body
    })
        .then(res => res)
        .catch(error => error.response)
}