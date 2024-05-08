import { useState, useEffect } from "react";
import { Fragment } from "react";
import { messageGroups, messgeTypes } from "../request-group-types";

const SendMessage = () => {
    const [selectedMsgGrp, setSelectedMsgGrp] = useState('-1');
    const [selectedMsgTyp, setSelectedMsgTyp] = useState('-1');
    const [dynamicMessageTypes, setSelectedMessageTypes] = useState([]);
    
    useEffect(() => {
        let group = Object.entries(messageGroups).find((grp) => {
            return grp[0] === selectedMsgGrp;
        })

        if (group) {
            setSelectedMessageTypes(messgeTypes[group[0]]);
        }
        setSelectedMsgTyp('-1');
    }), [selectedMsgGrp];

    return (
        <>
            <div className="flex flex-col ml-4 mr-2 border mt-4 rounded-md w-full">
                <div className="px-2 py-1 w-full text-center">
                    <h1 className="font-bold">Send Message</h1>
                </div>
                <div className="flex flex-row mb-4 w-full">
                    <div className="px-2 py-1 w-1/2">
                        <div className="flex flex-col w-full mb-3">
                            <div className="w-1/2">
                                <select className="select select-bordered w-full" value={selectedMsgGrp} onChange={(e) => setSelectedMsgGrp(e.target.value)}>
                                    <option disabled value="-1">Select Message Group</option>
                                    {Object.entries(messageGroups).map((grp) => {
                                        return <option key={grp[0]} value={grp[0]}>{grp[1] + ' - ' + grp[0]}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="w-1/2">
                                <select className="select select-bordered w-full" value={selectedMsgTyp} onChange={(e) => setSelectedMsgTyp(e.target.value)}>
                                {Object.entries(dynamicMessageTypes).map((typ) => {
                                        return <option key={typ[0]} value={typ[0]}>{typ[1] + ' - ' + typ[0]}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

        </>
    )
}

export default SendMessage;