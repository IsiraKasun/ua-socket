import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../socketContext";

const SocketConnector = () => {
    const [url, setUrl] = useState('');
    const [connType, setConnType] = useState('0');
    const [domain, setDomain] = useState('');
    const [port, setPort] = useState('');
    const [path, setPath] = useState('');

    let { socketObj } = useContext(SocketContext);

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

        setUrl(url);
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

    const handleConnect = () => {
        socketObj = new WebSocket(url);
        console.log(socketObj);
    }

    return (
        <div className="flex flex-row flex-wrap mx-4 h-40 border mt-4 rounded-md">
            <div className="flex flex-row flex-wrap w-full">
                <div className="p-2 w-2/12 text-center">Secure</div>
                <div className="p-2 w-1/12 text-center"></div>
                <div className="p-2 w-4/12 text-center">Domain/IP</div>
                <div className="p-2 w-1/12 text-center"></div>
                <div className="p-2 w-1/12 text-center">Port</div>
                <div className="p-2 w-1/12 text-center"></div>
                <div className="p-2 w-2/12 text-center">Path</div>
            </div>
            <div className="flex flex-row flex-wrap w-full">
                <div className="px-2 pb-2 w-2/12 text-center">
                    <select className="select select-bordered w-full max-w-xs" value={connType} onChange={(e) => handleConnTypeChange(e.target.value)}>
                        <option value="0">Non-Secure (WS)</option>
                        <option value="1">Secure (WSS)</option>
                    </select>
                </div>

                <div className="p-2 w-1/12 text-center">://</div>
                <div className="px-2 pb-2 w-4/12 text-center">
                    <input type="text" name="domain" placeholder="Domain" className="input input-bordered w-full max-w-xs" value={domain} onChange={(e) => handleDomainChange(e.target.value)}/>
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
                    <span className="px-2 font-semibold">{url}</span>
                    <button className="btn btn-primary" onClick={handleConnect}>Connect</button>
                </div>
            </div>

        </div>
    )
}


export default SocketConnector;