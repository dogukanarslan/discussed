import { useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router';

import { SignUp } from './pages/sign-up/SignUp';
import { SignIn } from './pages/sign-in/SignIn';
import { Chat } from './pages/chat/Chat';

function App() {
  const storageUser = sessionStorage.getItem('user');

  const [user, setUser] = useState(
    storageUser ? JSON.parse(storageUser) : null,
  );

  const router = createHashRouter([
    { path: '/', element: <Chat setUser={setUser} user={user} /> },
    { path: '/signin', element: <SignIn setUser={setUser} /> },
    { path: '/signup', element: <SignUp setUser={setUser} /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
