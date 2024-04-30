import { useState, useEffect, useContext } from "react";
import { ReadyState } from 'react-use-websocket';

const SocketConnector = ({ inputURL, setInputURL, handleSocketConnect, socket, socketState, disconnectSocket}) => {
    const [connType, setConnType] = useState('0');
    const [domain, setDomain] = useState('');
    const [port, setPort] = useState('');
    const [path, setPath] = useState('');
    const [socketURL, setSocketURL] = useState('');

    useEffect(() => {
        let url = connType === '0' ? 'ws' : 'wss';

        if (domain.trim()) {
            url += '://' + domain;
        }

        if (port.trim()) {
            url += ':' + port;
        }

        if (path.trim()) {
            url += '/' + path;
        }

        setSocketURL(url);

        if (isValidURL(url)) {
            setInputURL(url);
        }

    }, [connType, domain, port, path]);


    const handleConnTypeChange = (value) => {
        setConnType(value);
    }

    const handleDomainChange = (value) => {
        setDomain(value);
    }

    const handlePortChange = (value) => {
        setPort(value);
    }

    const handlePathChange = (value) => {
        setPath(value);
    }

    const isValidURL = (urlString) => {
        const urlPattern = new RegExp(/^(ws|wss):\/\/([\w-]+(\.[\w-]+)+)(\/[\w.\/?%&=]*)$/);
        return !!urlPattern.test(urlString);
    }

    return (
        <div className="flex flex-row flex-wrap mx-4 border mt-4 rounded-md">
            <div className="flex flex-row flex-wrap w-full">
                <div className="px-2 py-2 w-full text-center">
                    <h1 className="font-bold">Socket URL</h1>
                </div>
            </div>
            <div className="flex flex-row flex-wrap w-full pt-2">
                <div className="px-2 pb-2 w-2/12 text-center">
                    <select className="select select-bordered w-full max-w-xs" value={connType} onChange={(e) => handleConnTypeChange(e.target.value)}>
                        <option value="0">Non-Secure (WS)</option>
                        <option value="1">Secure (WSS)</option>
                    </select>
                </div>

                <div className="p-2 w-1/12 text-center">://</div>
                <div className="px-2 pb-2 w-4/12 text-center">
                    <input type="text" name="domain" placeholder="Domain" className="input input-bordered w-full max-w-xs" value={domain} onChange={(e) => handleDomainChange(e.target.value)} />
                </div>
                <div className="p-2 w-1/12 text-center">:</div>
                <div className="px-2 pb-2 w-1/12 text-center">
                    <input type="text" name="port" placeholder="Port" className="input input-bordered w-full max-w-xs" value={port} onChange={(e) => handlePortChange(e.target.value)} />
                </div>
                <div className="p-2 w-1/12 text-center">/</div>
                <div className="px-2 pb-2 w-2/12 text-center">
                    <input type="text" name="path" placeholder="Path" className="input input-bordered w-full max-w-xs" value={path} onChange={(e) => handlePathChange(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-center w-full py-2">
                <div className="px-2 text-center">
                    <span className="px-2 font-semibold">{socketURL}</span>
                    <button className="btn btn-primary mr-3" onClick={handleSocketConnect} disabled={socketState && socketState === 1 && 'disabled'}>{socketState && socketState === 1 ? 'Connected' : 'Connect'}</button>
                    {socketState && socketState === 1 && <button className="btn btn-warning" onClick={disconnectSocket}>Disconnect</button>}
                </div>
            </div>

        </div>
    )
}


export default SocketConnector;