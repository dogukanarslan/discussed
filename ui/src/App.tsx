import {useEffect, useState} from 'react';

import {SignIn} from './pages/SignIn';
import {SignUp} from './pages/SignUp';
import {Chat} from './pages/Chat';

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

  if (!user) {
    return;
  }

  return <Chat user={user} setUser={setUser} />;
}

export default App;
