
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