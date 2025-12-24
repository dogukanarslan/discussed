import {useEffect, useState} from 'react';
import {Router} from './Router';
import {SignUp} from './pages/SignUp';
import {SignIn} from './pages/SignIn';
import {Chat} from './pages/Chat';

function App() {
  const storageUser = sessionStorage.getItem('user');

  const [user, setUser] = useState(
    storageUser ? JSON.parse(storageUser) : null
  );

  useEffect(() => {
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
    '': <Chat user={user} setUser={setUser} />
  };

  return <Router>{routes}</Router>;
}

export default App;
