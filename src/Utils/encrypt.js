
import jsSHA from "jssha";
import md5 from "md5";

export const hash = (str, algorithm, outputType) => {
    switch (algorithm) {
        case 'MD5':
            return md5(str);
        case 'SHA1':
            return getShaHash(str, 'SHA-1', outputType);
        case 'SHA256':
            return getShaHash(str, 'SHA-256', outputType);
    }
}

const getShaHash = (str, algorithm, outputType) => {
    const shaObj = new jsSHA(algorithm, 'TEXT', { encoding: "UTF8" });
    shaObj.update(str);
    return shaObj.getHash(outputType);
}


export const convertUnicodeToNativeString = function (unicodeString) {
    if (unicodeString) {
        return unicodeString.replace(/\\u[\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef][\dABCDEFabcdef]/g,
            function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
            });
    }

    return unicodeString;
};