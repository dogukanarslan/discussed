import { useState } from 'react';
import { createHashRouter, RouterProvider } from 'react-router';

import { SignUp } from '@/pages/sign-up/SignUp';
import { SignIn } from '@/pages/sign-in/SignIn';

import { Layout } from '@/Layout';
import { Subjects } from '@/pages/subjects/Subjects';
import { CreateSubject } from '@/pages/create-subject/CreateSubject';
import { SubjectDetail } from './pages/subject-detail/SubjectDetail';
import { Dashboard } from './pages/chat/Dashboard';

export type UserModel = { id: number; username: string };

function App() {
  const storageUser = sessionStorage.getItem('user');

  const [user, setUser] = useState<UserModel | null>(
    storageUser ? (JSON.parse(storageUser) as UserModel) : null,
  );

  const router = createHashRouter([
    {
      element: <Layout setUser={setUser} user={user} />,
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/subjects', element: <Subjects /> },
        {
          path: '/subjects/:subjectId',
          element: <SubjectDetail user={user!} />,
        },
        { path: '/subjects/create', element: <CreateSubject user={user!} /> },
      ],
    },
    { path: '/signin', element: <SignIn setUser={setUser} /> },
    { path: '/signup', element: <SignUp setUser={setUser} /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
