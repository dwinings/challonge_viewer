import React from 'react';

export function corsAnywherePrefix() {
    return "https://cors-anywhere.herokuapp.com/";
}

export function embedURIParams(uri, params) {
    let addedKey = false;
    for (let key in params) {
        if (params.hasOwnProperty(key)) {
            if (!addedKey) {
                addedKey = true;
                uri += "?";
            } else {
                uri += "&";
            }

            uri += `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        }
    }
    return uri;
}

const urlRegex = /.*\/\/(?:(.*).)?challonge.com\/(.*)\/?/;
export function decodeChallongeUrl(url) {
    let match = urlRegex.exec(url);
    let orgPrefix = "";
    let tourneyId = null;

    if (match !== null) {
        if (match[1].length > 0) {
            orgPrefix = match[1] + "-";
        }
        tourneyId = match[2]
        return orgPrefix + tourneyId;
    } else {
        return null;
    }
}

export function routeSplatter(container, more_args) {
    more_args = more_args || {};
    return (props) => {
        return React.createElement(container, Object.assign(more_args, props.match.params));
    };
}