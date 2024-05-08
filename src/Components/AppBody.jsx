import UserAuthenticator from './UserAuthenticator';
import UserDetails from './UserDetails';
import MessageViewer from './MessageViewer';
import CompulsaryRequests from './CompulsaryRequests';
import SendMessage from './SendMessage';

const AppBody = ({ inputURL, setInputURL, socket, sendAuthMessage, receivedMessageHistory, sentMessageHistory, getCustomerDetailsRequest, sendCustomRequest}) => {
    return (
        <>
            <div className="flex flex-row w-full">
                <UserAuthenticator inputURL={inputURL} setInputURL={setInputURL} socket={socket} sendAuthMessage={sendAuthMessage}></UserAuthenticator>
                <UserDetails receivedMessageHistory={receivedMessageHistory}></UserDetails>
                <CompulsaryRequests getCustomerDetailsRequest={getCustomerDetailsRequest} receivedMessageHistory={receivedMessageHistory}></CompulsaryRequests>
            </div>
            <div className="flex flex-row w-full">
                <SendMessage sendCustomRequest={sendCustomRequest}/>
            </div>
            <div className="flex flex-row w-full">
                <MessageViewer viewerName='Sent Messages' msgArray={sentMessageHistory}/>
                <MessageViewer viewerName='Received Messages' msgArray={receivedMessageHistory}/>
            </div>
        </>
    )
}

export default AppBody;