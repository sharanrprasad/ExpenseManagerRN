// @flow
import axios from "axios";
import logger from "../core/logger";
import { AsyncStorage } from "react-native";
import { getStoredJwtToken } from "./asyncStorageRequests";

export function getHttpJson(url: string, params: ?any, headers?: Headers): Promise<any> {
    console.log(getCommonHeaders(headers));
    return axios
        .get(url, {
            headers: getCommonHeaders(headers),
            params: params ? params : {}
        })
        .then(response => {
            logger.log("[Http Get Response] ", response);
            return response;
        });
}

export function postHttpJson(url: string, body: any, headers?: Headers): Promise<any> {
    console.log(headers);
    return axios
        .post(url, body, {
            headers: getCommonHeaders(headers)
        })
        .then(data => {
            logger.log("[Http Post Response ]", data);
            return data;
        });
}

export function deleteHttpJson(url: string, body: any, headers?: Headers): Promise<any> {
    console.log(url);

    return axios.delete(url, {
        headers: getCommonHeaders(headers)
    });
}

const getCommonHeaders = (headers?: Headers): any => {
    if (headers == null || headers === undefined) {
        headers = {};
    }
    // $FlowFixMe
    headers["Content-Type"] = "application/json";
    // $FlowFixMe
    headers["Access-Control-Allow-Origin"] = "*";
    return headers;
};
