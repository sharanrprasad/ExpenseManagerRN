// @flow
import axios from "axios";
import logger from "../core/logger";
import { AsyncStorage } from "react-native";
import { getStoredJwtToken } from "./asyncStorageRequests";

export function getHttpJson(url: string, params: ?any, headers?: Headers): Promise<any> {
    return getCommonHeaders(headers)
        .then(headers => {
            console.log(headers);
            return axios.get(url, {
                headers: headers,
                params: params ? params : {}
            });
        })
        .then(response => {
            logger.log("[Http Get Response] ", response);
            return response;
        });
}

export function postHttpJson(url: string, body: any, headers?: Headers): Promise<any> {
    return getCommonHeaders(headers)
        .then(headers => {
            console.log(headers);
            return axios.post(url, body, {
                headers: headers
            });
        })
        .then(data => {
            logger.log("[Http Post Response ]", data);
            return data;
        });
}


export function deleteHttpJson(url:string, body: any, headers?: Headers): Promise<any> {
    console.log(url);
    return getCommonHeaders(headers).then(headers => {
       return axios.delete(url,{
                headers : headers
       });
    });

}



const getCommonHeaders = (headers?: Headers): Promise<Headers> => {
    return new Promise(resolve => {
        if (headers == null || headers === undefined) {
            headers = new Headers();
        }
        headers.set('Content-Type', "application/json");
        headers.set('Access-Control-Allow-Origin', "*");
        getStoredJwtToken()
            .then(val => {
                console.log("Got Token ", val);
                if (val && headers) headers.set('Authorization', 'Bearer ' +val);
                //$FlowFixMe
                return resolve(headers);
            })
            .catch(err => {
                //$FlowFixMe
                return resolve(headers);
            });
    });
};
