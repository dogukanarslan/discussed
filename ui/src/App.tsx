import {useEffect, useState} from 'react';

import {MessageForm} from './MessageForm';
import {MessageList} from './MessageList';

import {Header} from './Header';
import {SignIn} from './SignIn';
import {SignUp} from './SignUp';

function App() {
  const storageUser = sessionStorage.getItem('user');

  const [route, setRoute] = useState(window.location.hash);
  const [user, setUser] = useState(
    storageUser ? JSON.parse(storageUser) : null
  );

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  useEffect(() => {
    if (!user && route !== '#signin' && route !== '#signup') {
      window.location.hash = '#signin';
    }
  }, [user, route]);

  if (route === '#signin') {
    return (
      <div className="container">
        <SignIn setUser={setUser} />
      </div>
    );
  }

  if (route === '#signup') {
    return (
      <div className="container">
        <SignUp setUser={setUser} />
      </div>
    );
  }

  return (
    <div className="container">
      <Header user={user} setUser={setUser} />
      <MessageList user={user} />
      <MessageForm />
    </div>
  );
}

export default App;
