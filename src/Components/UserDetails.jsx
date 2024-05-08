import { useEffect, useState } from "react";
import { hash } from "../Utils/encrypt";
import { convertUnicodeToNativeString } from "../Utils/encrypt";
import { setUserAndSessionId, removeUserAndSessionId } from '../Reducers/user-details-reducer';
import { useSelector, useDispatch } from "react-redux";

const UserDetails = ({receivedMessageHistory}) => {
    const [userObj, setUserObj] = useState({});
    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        receivedMessageHistory.forEach((msg) => {
            if (msg.HED.msgGrp === 5 && msg.HED.msgTyp === 101) {
                setUserObj(msg);
                dispatch(setUserAndSessionId({userId: msg.DAT.usrId, sessionId: msg.HED.sesnId, channelId: msg.HED.chnlId}));
            }
        });
    }, [receivedMessageHistory.length]);

    return (
        <div className="flex flex-col flex-nowrap mr-2 ml-1 border mt-4 rounded-md w-2/5 items-start">
            <div className="px-2 py-1 w-full text-center">
                <h1 className="font-bold">Authentication Response</h1>
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