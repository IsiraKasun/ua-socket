import './App.css';
import Header from './Components/AppHeader';
import SocketConnector from './Components/SocketConnector';
import { SocketContext } from './socketContext';

function App() {
  return (
    <>
      <SocketContext.Provider value={{}}>
        <Header />
        <SocketConnector />
      </SocketContext.Provider>
    </>
  )
}

export default App
