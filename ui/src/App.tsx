import {useState} from 'react';
import {MessageForm} from './MessageForm';

import {MessageList} from './MessageList';

import {Login} from './Login';

import 'http://localhost:8080/socket.io/socket.io.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem('username')
  );

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="container">
      <MessageList />
      <MessageForm />
    </div>
  );
}

export default App;
