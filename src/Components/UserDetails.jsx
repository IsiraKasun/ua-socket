import { useEffect, useState } from "react";
import jsSHA from "jssha";
import { hash } from "../Utils/encrypt";
import { pickResponseObjectByGroupType } from "../Utils/response-handler";
import { convertUnicodeToNativeString } from "../Utils/encrypt";
import { useSelector, useDispatch } from 'react-redux';
import { setUserAndSessionId, removeUserAndSessionId } from '../Reducers/socket-state-reducer';

const UserDetails = ({ inputURL, setInputURL, connectSocket, socketStatus, sendAuthMessage, receivedMessageHistory, heartBeat, setHeartBeat }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [encType, setEncType] = useState('-1');
    const [channelId, setChannelId] = useState('-1');
    const [userObj, setUserObj] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        if (receivedMessageHistory.length) {
            receivedMessageHistory.forEach((msg) => {
                if (msg && msg.HED) {
                    if (msg.HED.msgGrp === 5 && msg.HED.msgTyp === 101) {
                        setUserObj(msg);
                        dispatch(setUserAndSessionId({userId: msg.DAT.usrId, sessionId: msg.HED.sesnId}));
                        setHeartBeat((hb) => {
                            console.log(hb);
                            let updatedHb = {...hb}
                            updatedHb.HED.usrId = msg.DAT.usrId;
                            updatedHb.HED.sesnId = msg.HED.sesnId;
                            console.log(updatedHb);
                            return updatedHb;
                        });
                        // console.log('hi');
                        // console.log(heartBeat);
                    }
                }
            });
        }

    }, [receivedMessageHistory]);

    const handleConnect = () => {
        // connectSocket(socketURL);
        // sendAuthMessage();
        const encryptedPassword = hash(password, encType, 'B64');
        sendAuthMessage(username, encryptedPassword, channelId);
    }

    return (
        <div className="flex flex-col flex-nowrap mr-4 ml-2 border mt-4 rounded-md w-3/5 items-start">
            <div className="px-2 py-1 w-full text-center">
                <h1 className="font-bold">User Details</h1>
            </div>
            <div className="flex flex-row px-2 py-1 w-full">
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        First Name
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {userObj && userObj.DAT && convertUnicodeToNativeString(userObj.DAT.custFstNme)}
                    </div>
                </div>
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        Last Name
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {userObj && userObj.DAT && convertUnicodeToNativeString(userObj.DAT.custLstNme)}
                    </div>
                </div>
            </div>
            <div className="flex flex-row px-2 py-1 w-full">
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        Authentication Status
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {userObj && userObj.DAT && userObj.DAT.authSts}
                    </div>
                </div>
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        Mobile
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {userObj && userObj.DAT && userObj.DAT.mobile}
                    </div>
                </div>
            </div>
            <div className="flex flex-row px-2 py-1 w-full">
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        User ID
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {userObj && userObj.DAT && userObj.DAT.usrId}
                    </div>
                </div>
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        Mubasher No. 
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {userObj && userObj.DAT && userObj.DAT.mubNo}
                    </div>
                </div>
            </div>
            <div className="flex flex-row px-2 py-1 w-full">
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                        SessionId ID
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        {userObj && userObj.HED && userObj.HED.sesnId}
                    </div>
                </div>
                <div className="w-2/12">
                    <div className="px-2 pb-2">
                         
                    </div>
                </div>
                <div className="w-4/12">
                    <div className="px-2 pb-2 font-bold">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails;