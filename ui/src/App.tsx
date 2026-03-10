import { useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router';

import { SignUp } from '@/pages/sign-up/SignUp';
import { SignIn } from '@/pages/sign-in/SignIn';
import { Chat } from '@/pages/chat/Chat';
import { Rooms } from '@/pages/rooms/Rooms';

import { Layout } from '@/Layout';

function App() {
  const storageUser = sessionStorage.getItem('user');

  const [user, setUser] = useState(
    storageUser ? (JSON.parse(storageUser) as { username: string }) : null,
  );

  const router = createHashRouter([
    {
      element: <Layout setUser={setUser} user={user} />,
      children: [
        { path: '/', element: <Chat user={user!} /> },
        { path: '/rooms', element: <Rooms /> },
      ],
    },
    { path: '/signin', element: <SignIn setUser={setUser} /> },
    { path: '/signup', element: <SignUp setUser={setUser} /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
