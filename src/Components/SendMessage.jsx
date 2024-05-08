import { useState, useEffect } from "react";
import { messageGroups, messgeTypes } from "../request-group-types";
import { useSelector } from "react-redux";
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const requestTemplate = {
    DAT: {},
    HED: {
        clVer: 'socket-supporter-v1',
        msgTyp: '',
        msgGrp: '',
        chnlId: '',
        ver: 'DFN_JSON_1.0',
        usrId: '',
        sesnId: ''
    }
}

const SendMessage = ({sendCustomRequest}) => {
    const [selectedMsgGrp, setSelectedMsgGrp] = useState('-1');
    const [selectedMsgTyp, setSelectedMsgTyp] = useState('-1');
    const [dynamicMessageTypes, setSelectedMessageTypes] = useState([]);
    const [requestObject, setRequestObject] = useState(requestTemplate);
    const userDetails = useSelector(state => state.userDetailsReducer);

    useEffect(() => {
        setRequestObject((prevReqObj) => {
            let newObj = { ...prevReqObj };
            newObj.HED.chnlId = userDetails.channelId;
            newObj.HED.usrId = userDetails.userId;
            newObj.HED.sesnId = userDetails.sessionId;
            return newObj;
        })
    }, [userDetails]);



    useEffect(() => {
        



    }), [selectedMsgGrp];

    const handleMessageGroupChange = (value) => {
        let group = Object.entries(messageGroups).find((grp) => {
            return grp[0] === value;
        })

        if (group) {
            setSelectedMessageTypes(messgeTypes[group[0]]);
        }
        setSelectedMsgGrp(value);
        setSelectedMsgTyp('-1');

        setRequestObject((prevReqObj) => {
            let newObj = { ...prevReqObj };
            newObj.HED.msgGrp = value === '-1' ? '' : parseInt(value, 10);
            return newObj;
        })
    };

    const handleMessageTypeChange = (value) => {
        setSelectedMsgTyp(value);
        setRequestObject((prevReqObj) => {
            let newObj = { ...prevReqObj };
            newObj.HED.msgTyp = value === '-1' ? '' : parseInt(value, 10)
            return newObj;
        })
    };

    const onEditRequestObject = (modifiedDetails) => {
        setRequestObject(modifiedDetails.src);
    }

    return (
        <>
            <div className="flex flex-col ml-4 mr-2 border mt-4 rounded-md w-full">
                <div className="px-2 py-1 w-full text-center">
                    <h1 className="font-bold">Send Message</h1>
                </div>
                <div className="flex flex-row mb-4 w-full">
                    <div className="px-2 py-1 w-1/4">
                        <div className="flex flex-col w-full mb-3">
                            <div className="w-full">
                                <select className="select select-bordered w-full" value={selectedMsgGrp} onChange={(e) => handleMessageGroupChange(e.target.value)}>
                                    <option disabled value="-1">Select Message Group</option>
                                    {Object.entries(messageGroups).map((grp) => {
                                        return <option key={grp[0]} value={grp[0]}>{grp[1] + ' - ' + grp[0]}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="w-full">
                                <select className="select select-bordered w-full" value={selectedMsgTyp} onChange={(e) => handleMessageTypeChange(e.target.value)}>
                                    <option disabled value="-1">Select Message Type</option>
                                    {Object.entries(dynamicMessageTypes).map((typ) => {
                                        return <option key={typ[0]} value={typ[0]}>{typ[1] + ' - ' + typ[0]}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="w-full pt-3 text-center">
                                <p>The fields of the displayed request object is <b>editable. </b></p>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="w-full pt-5 text-center">
                            <button type="button" className="btn btn-accent" onClick={() => {sendCustomRequest(requestObject)}}>Send Request</button>
                            </div>
                        </div>
                    </div>
                    <div className="px-2 py-1 w-1/2">
                        <JsonView collapsed={2} editable={true} src={requestObject} onEdit={onEditRequestObject}/>
                    </div>
                </div>

            </div>

        </>
    )
}

export default SendMessage;