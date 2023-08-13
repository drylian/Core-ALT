import axios from 'axios';
import { store } from '../states';

const http = axios.create({
    // baseURL: "https://jsonplaceholder.typicode.com",
    baseURL: "",
    withCredentials: true,
    timeout: 20000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': window.Website.csrfToken,
    },
});

http.interceptors.request.use((req) => {
    store.getActions().progress.startContinuous();
    return req;
});

http.interceptors.response.use(
    (resp) => {
        store.getActions().progress.setComplete();

        return resp;
    },
    (error) => {
        store.getActions().progress.setComplete();

        throw error;
    }
);

export default http;

export function FlashError(error) {
    if (error.response && error.response.data) {
        let { data } = error.response;

        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) {
                // nada, Json quebrado
            }
        }

        if (data.errors && data.errors[0] && data.errors[0].detail) {
            return data.errors[0].detail;
        }

        if (data.error && typeof data.error === 'string') {
            return data.error;
        }
    }

    return error.message;
}