import './App.css';
import Header from './Components/AppHeader';
import SocketConnector from './Components/SocketConnector';
import React, { useState, useEffect, useRef } from 'react';
import AppBody from './Components/AppBody';
import store from './store';
import { Provider } from 'react-redux';


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

const heartBeatTemplate = {
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

const socketStates = {
  state_0: 'Connecting',
  state_1: 'Connected',
  state_2: 'Closing',
  state_3: 'Closed'
}



function App() {
  const [url, setUrl] = useState('');
  const [inputURL, setInputURL] = useState('ws://echo.websocket.org');
  const [userId, setUserId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [heartBeat, setHeartBeat] = useState(heartBeatTemplate);
  const socket = useRef(null);
  const [socketState, setSocketState] = useState('');


  // const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(url, {
  //   onOpen: () => { console.log('opened') },
  //   onClose: () => { console.log('closed'); setUrl('ws://echo.websocket.org') },
  //   heartbeat: {
  //     message: heartBeatTemplate,
  //     interval: 10000
  //   }
  // });

  const [receivedMessageHistory, setReceivedMessageHistory] = useState([]);
  const [sentMessageHistory, setSentMessageHistory] = useState([]);

  const handleSocketConnect = () => {
      socket.current = new WebSocket(inputURL);

      socket.current.onopen = () => {
        console.log('Socket opened');
        setSocketState(socket.current.readyState);
      };

      socket.current.onclose = () => {
        console.log('Socket closed');
        setSocketState(socket.current.readyState);
      };

      socket.current.onmessage = (msg) => {
        let message = msg.data;
        setReceivedMessageHistory((prevRecevedMsgHistory) => {
          return [...prevRecevedMsgHistory].concat(message);
        })
      };

      socket.current.onerror = (e) => {
        console.log('Socket Error ' + e);
        setSocketState(socket.current.readyState);
      };
  };

  const disconnectSocket = () => {
    socket.current.close();
  }

  const sendAuthMessage = (username, password, channelId) => {
    setUrl(inputURL);

    let jsonObj = requestTemplate;
    jsonObj.HED.msgGrp = 5;
    jsonObj.HED.msgTyp = 1;
    jsonObj.HED.chnlId = parseInt(channelId, 10);
    jsonObj.DAT.lgnNme = username;
    jsonObj.DAT.pwd = password;

    socket.current.send(JSON.stringify(jsonObj));
    setSentMessageHistory((prevMsgHistory) => {
      return [...prevMsgHistory].concat(jsonObj);
    });
  }

  return (
    <Provider store={store}>
      <Header socketState={socketState}/>
      <SocketConnector inputURL={inputURL} setInputURL={setInputURL} handleSocketConnect={handleSocketConnect} socket={socket.current} socketState={socketState} disconnectSocket={disconnectSocket}/>
      <AppBody inputURL={inputURL} setInputURL={setInputURL} socket={socket.current} sendAuthMessage={sendAuthMessage} receivedMessageHistory={receivedMessageHistory} sentMessageHistory={sentMessageHistory} heartBeat={heartBeat} setHeartBeat={setHeartBeat}></AppBody>
    </Provider>
  )
}

export default App
