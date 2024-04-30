import UserAuthenticator from './UserAuthenticator';
import UserDetails from './UserDetails';

const AppBody = ({inputURL, setInputURL, socket, sendAuthMessage, receivedMessageHistory, sentMessageHistory, heartBeat, setHeartBeat}) => {
    return (
        <div className="flex flex-row w-full">
            <UserAuthenticator inputURL={inputURL} setInputURL={setInputURL} socket={socket} sendAuthMessage={sendAuthMessage}></UserAuthenticator>
            <UserDetails inputURL={inputURL} setInputURL={setInputURL} socket={socket} sendAuthMessage={sendAuthMessage} receivedMessageHistory={receivedMessageHistory} sentMessageHistory={sentMessageHistory} heartBeat={heartBeat} setHeartBeat={setHeartBeat}></UserDetails>
        </div>
    )
}

export default AppBody;