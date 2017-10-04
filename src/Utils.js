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
        if (match[1] && match[1].length > 0 && match[1] !== 'www') {
            orgPrefix = match[1] + "-";
        }
        tourneyId = match[2];
        return orgPrefix + tourneyId;
    } else {
        return null;
    }
}
