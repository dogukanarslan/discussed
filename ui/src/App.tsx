import { MessageForm } from './MessageForm';

import { MessageList } from './MessageList';

import { Header } from './Header';
import { useState } from 'react';

function App() {
  const storageUser = sessionStorage.getItem('user');
  const [user, setUser] = useState(
    storageUser ? JSON.parse(storageUser) : null
  );

  return (
    <div className="container">
      <Header user={user} setUser={setUser} />
      <MessageList user={user} />
      <MessageForm />
    </div>
  );
}

export default App;
