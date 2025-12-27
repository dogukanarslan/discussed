import {useEffect, useState} from 'react';
import {Router} from './Router';
import {SignUp} from './pages/sign-up/SignUp';
import {SignIn} from './pages/sign-in/SignIn';
import {Chat} from './pages/chat/Chat';

function App() {
  const storageUser = sessionStorage.getItem('user');

  const [user, setUser] = useState(
    storageUser ? JSON.parse(storageUser) : null
  );

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#chat';
    }

    if (
      !user &&
      window.location.hash !== '#signin' &&
      window.location.hash !== '#signup'
    ) {
      window.location.hash = '#signin';
    }
  }, [user]);

  const routes = {
    '#signin': <SignIn setUser={setUser} />,
    '#signup': <SignUp setUser={setUser} />,
    '#chat': <Chat user={user} setUser={setUser} />
  };

  return <Router>{routes}</Router>;
}

export default App;
