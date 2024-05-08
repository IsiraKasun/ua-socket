import { useState} from "react";
import { hash } from "../Utils/encrypt";

const UserAuthenticator = ({ inputURL, setInputURL, socket, sendAuthMessage}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [encType, setEncType] = useState('-1');
    const [channelId, setChannelId] = useState('-1');
    
    const handleConnect = () => {
        const encryptedPassword = hash(password, encType, 'B64');
        sendAuthMessage(username, encryptedPassword, channelId);
    }

    return (
        <div className="flex flex-row flex-wrap ml-4 mr-2 border mt-4 rounded-md w-1/5">
            <div className="flex flex-row flex-wrap w-full">
                <div className="px-2 py-1 w-full text-center">
                    <h1 className="font-bold">Authenticate</h1>
                </div>
            </div>
            <div className="flex flex-row flex-wrap w-full">
                <div className="px-2 pb-2 w-full">
                    <input type="text" name="username" placeholder="Username" className="input input-bordered w-full" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-row flex-wrap w-full">
                <div className="px-2 pb-2 w-full">
                    <input type="text" name="password" placeholder="Password" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="flex flex-row flex-wrap w-full">
                <div className="px-2 pb-2 w-full">
                    <select className="select select-bordered w-full" value={encType} onChange={(e) => setEncType(e.target.value)} >
                        <option disabled value="-1">Password Encryption</option>
                        <option value="MD5">MD5</option>
                        <option value="SHA1">SHA1</option>
                        <option value="SHA256">SHA256</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-row flex-wrap w-full">
                <div className="px-2 pb-2 w-full">
                    <select className="select select-bordered w-full" value={channelId} onChange={(e) => setChannelId(e.target.value)}>
                        <option disabled value="-1">Channel</option>
                        <option value="30">Web</option>
                        <option value="31">Android</option>
                        <option value="32">iOS</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-row flex-wrap w-full">
                <div className="px-2 pb-2 justify-center text-center w-full">
                    <button type="button" className="btn btn-primary" onClick={handleConnect}>Authenticate</button>
                </div>
            </div>
        </div>
    )
}

export default UserAuthenticator;