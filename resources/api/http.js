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
        'X-XSRF-TOKEN': getCsrfToken(), 
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

export function httpErrorToHuman(error) {
    if (error.response && error.response.data) {
        let { data } = error.response;

        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (e) {
                // do nothing, bad json
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

export function getPaginationSet(data) {
    return {
        total: data.total,
        count: data.count,
        perPage: data.per_page,
        currentPage: data.current_page,
        totalPages: data.total_pages,
    };
}

export const withQueryBuilderParams = (data) => {
    if (!data) return {};

    const filters = Object.keys(data.filters || {}).reduce((obj, key) => {
        const value = data.filters?.[key];

        return !value || value === '' ? obj : { ...obj, [`filter[${key}]`]: value };
    }, {});

    const sorts = Object.keys(data.sorts || {}).reduce((arr, key) => {
        const value = data.sorts?.[key];
        if (!value || !['asc', 'desc', 1, -1].includes(value)) {
            return arr;
        }

        return [...arr, (value === -1 || value === 'desc' ? '-' : '') + key];
    }, []);

    return {
        ...filters,
        sort: sorts.length ? sorts.join(',') : undefined,
        page: data.page,
    };
};

function getCsrfToken() {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].split('=');
      if (cookieName === 'XSRF-TOKEN') {
        return decodeURIComponent(cookieValue);
      }
    }
    return '';
  }