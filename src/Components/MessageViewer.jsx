import { useState, useEffect } from "react";
import { Fragment } from "react";
import JsonView from 'react18-json-view'
import 'react18-json-view/src/style.css'

const MessageViewer = ({ viewerName, msgArray }) => {

    return (
        <div className="flex flex-col ml-4 mr-2 border mt-4 rounded-md w-1/2 h-max">
            <div className="px-2 py-1 w-full text-center">
                <h1 className="font-bold">{viewerName}</h1>
            </div>
            <div className="px-2 py-1 w-full items-start">
                {[...msgArray].reverse().map((msg, index) => (
                    <Fragment key={index}>
                        <div className="divider"></div>
                        <JsonView key={index} collapsed={1} src={msg} />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default MessageViewer;