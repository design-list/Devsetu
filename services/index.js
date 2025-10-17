//services/index.js

import { loadState } from '../utils/localstorage';
import { endpoints } from './endpoints';

// const token = sessionStorage.getItem("token")


const fetchHeader = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/plain, */*",
}

const fetchHeaderFile = { "Content-Type": "application/json", "mimeType": "multipart/form-data" }

export default class Api {
   

    fetch = ( url, method, body, params ) => {
        const token = loadState("token")
        
        let opt = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token ? token : ""}`,
                "Accept": "application/json, text/plain, */*",
            },
            body: body,
        }
        return fetch(url, opt).then((response) => response.json())
    }

    // queryParams = (params) => {
    //     return Object.keys(params)
    //         .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    //         .join('&');
    // }

    fetchMultParams = (url, method, body, params) => {
        const token = loadState("token");
    
        let opt = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token ? token : ""}`,
                "Accept": "application/json, text/plain, */*",
            },
            body: body,
        };
    
        if (params) {
            const queryString = Object.keys(params)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join('&');
            url += `?${queryString}`;
        }
    
        return fetch(url, opt).then((response) => response.json());
    };
       

    fetchParams = (url, method, body, params) => {
        const token = loadState("token")

        let opt = {
            method: method,
             headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token ? token : ""}`,
                "Accept": "application/json, text/plain, */*",
            },
            body: body,
        }
        if (params) {
            url += `${params}`;
        }

        return fetch(url, opt).then((response) => response.json())
    }

    fetchPdf = (url, method, body, params) => {
        const token = loadState("token");
    
        let opt = {
            method: method,
            headers: {
                'Content-Type': 'application/pdf',
                "Authorization": `Bearer ${token ? token : ""}`,
                "Accept": "application/pdf",
            },
            body: body,
        };
    
        if (params) {
            url += `${params}`;
        }
    
        return fetch(url, opt);
    };
    

    fetchFile = (url, method, body) => {
        let opt = {
            method: method,
            headers: fetchHeaderFile,
            body: body,
            credentials: 'same-origin'
        }
        return fetch(url, opt).then((response) => response.json())
    }

    fetchNormal = (url, method, body) => {
        let opt = {
            method: method,
            headers: fetchHeader,
            body: body,
        }
        return fetch(url, opt).then((response) => response.json())
    }


    buildUrl = (path, urlType = "") => {

        if (urlType === "full") {
            return `${path}`;
        } else {
            return `${endpoints.baseUrl}${path}`;
        }
    }
}
