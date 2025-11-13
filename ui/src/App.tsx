import {useEffect, useState} from 'react';
import {MessageForm} from './MessageForm';

import {MessageList} from './MessageList';

function App() {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    fetch(`/api/messages`)
      .then((res) => res.json())
      .then((data) => {
        setMsgs(data);
      });
  }, []);

  return (
    <div className="container">
      <h1>Messages</h1>
      <MessageList messages={msgs} />
      <MessageForm />
    </div>
  );
}

export default App;
