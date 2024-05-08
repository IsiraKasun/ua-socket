import './App.css';
import Header from './Components/AppHeader';
import SocketConnector from './Components/SocketConnector';
import React, { useState, useEffect, useRef } from 'react';
import AppBody from './Components/AppBody';
import { useSelector } from 'react-redux';



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

function App() {
  const [url, setUrl] = useState('');
  const [inputURL, setInputURL] = useState('ws://echo.websocket.org');
  const socket = useRef(null);
  const [socketState, setSocketState] = useState('');
  const userDetails = useSelector(state => state.userDetailsReducer);
  const [recentURLList, setRecentURLList] = useState([]);

  const [receivedMessageHistory, setReceivedMessageHistory] = useState([]);
  const [sentMessageHistory, setSentMessageHistory] = useState([]);

  const handleSocketConnect = () => {
    socket.current = new WebSocket(inputURL);

    socket.current.onopen = () => {
      console.log('Socket opened');
      setSocketState(socket.current.readyState);
      updateRecentURLs(inputURL);
    };

    socket.current.onclose = () => {
      console.log('Socket closed');
      setSocketState(socket.current.readyState);
    };

    socket.current.onmessage = (msg) => {
      let message = msg.data;
      setReceivedMessageHistory((prevRecevedMsgHistory) => {
        return [...prevRecevedMsgHistory].concat(JSON.parse(message));
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

  const updateRecentURLs = (url) => {
    let urls = localStorage.getItem('recentURLs') || '';
        let urlArray = urls ? urls.split(',') : [];

        if (!urlArray.includes(url)) {
           urlArray.push(url);
           let urlString = urlArray.join(',');
           localStorage.setItem('recentURLs', urlString);
        }
  }

  const sendAuthMessage = (username, password, channelId) => {
    setUrl(inputURL);

    const jsonObj = JSON.parse(JSON.stringify(requestTemplate));
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

  const getCustomerDetailsRequest = () => {
    const jsonObj = JSON.parse(JSON.stringify(requestTemplate));
    jsonObj.HED.msgGrp = 10;
    jsonObj.HED.msgTyp = 3;
    jsonObj.HED.chnlId = userDetails.channelId;
    jsonObj.HED.usrId = userDetails.userId;
    jsonObj.HED.sesnId = userDetails.sessionId;
  
    jsonObj.DAT.cusId = userDetails.userId;

    socket.current.send(JSON.stringify(jsonObj));
    setSentMessageHistory((prevMsgHistory) => {
      return [...prevMsgHistory].concat(jsonObj);
    });
  }

  const sendCustomRequest = (reqObj) => {
    const jsonObj = reqObj;

    socket.current.send(JSON.stringify(jsonObj));
    setSentMessageHistory((prevMsgHistory) => {
      return [...prevMsgHistory].concat(jsonObj);
    });
  }

  return (
    <>
      <Header socketState={socketState} />
      <SocketConnector inputURL={inputURL} setInputURL={setInputURL} handleSocketConnect={handleSocketConnect} socket={socket.current} socketState={socketState} disconnectSocket={disconnectSocket} recentURLList={recentURLList} setRecentURLList={setRecentURLList}/>
      <AppBody inputURL={inputURL} setInputURL={setInputURL} socket={socket.current} sendAuthMessage={sendAuthMessage} receivedMessageHistory={receivedMessageHistory} sentMessageHistory={sentMessageHistory} getCustomerDetailsRequest={getCustomerDetailsRequest} sendCustomRequest={sendCustomRequest}></AppBody>
    </>
  )
}

export default App
