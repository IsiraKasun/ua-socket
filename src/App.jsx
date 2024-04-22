import './App.css';
import Header from './Components/AppHeader';
import SocketConnector from './Components/SocketConnector';
import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import UserAuthenticator from './Components/UserAuthenticator';

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

function App() {
  const [url, setUrl] = useState('ws://echo.websocket.org');
  const [inputURL, setInputURL] = useState('ws://echo.websocket.org');
  const [userId, setUserId] = useState('');
  const [sessionId, setSessionId] = useState('');
  const heartBeat = requestTemplate;

  const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(url, {
    onOpen: () => { console.log('opened') },
    heartbeat: {
      message: 'heart',
      interval: 10000
    }
  });

  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    setMessageHistory((prevMsgHistory) => {
      return [...prevMsgHistory].concat(lastJsonMessage);
    })

    processResponseMessages(lastJsonMessage);
  }, [lastJsonMessage])

  const handleSocketConnect = (socketURL) => {
    setUrl(socketURL);
  };

  const sendAuthMessage = (username, password, channelId) => {
    setUrl(inputURL);

    let jsonObj = requestTemplate;
    jsonObj.HED.msgGrp = 5;
    jsonObj.HED.msgTyp = 1;
    jsonObj.HED.chnlId = parseInt(channelId, 10);
    jsonObj.DAT.lgnNme = username;
    jsonObj.DAT.pwd = password;

    sendJsonMessage(jsonObj);
  }

  const processResponseMessages = (message) => {
    if (message && message.HED) {
      switch (message.HED.msgGrp) {
        case 5:
          switch (message.HED.msgTyp) {
            case 101:

          }
      }
    }
  }

  return (
    <>
      <Header />
      <SocketConnector inputURL={inputURL} setInputURL={setInputURL} />
      <UserAuthenticator inputURL={inputURL} setInputURL={setInputURL} connectSocket={handleSocketConnect} socketStatus={readyState} sendAuthMessage={sendAuthMessage}></UserAuthenticator>
    </>
  )
}

export default App
