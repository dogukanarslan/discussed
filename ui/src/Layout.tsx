import { Navigate, Outlet } from 'react-router';
import { Header } from '@/components/Header';
import type { UserModel } from './App';

interface Props {
  user: UserModel | null;
  setUser: (user: UserModel | null) => void;
}

export const Layout = (props: Props) => {
  const { user, setUser } = props;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="h-full flex flex-col">
      <Header user={user} setUser={setUser} />
      <div className="flex flex-col gap-3 h-[calc(100%-60px)] w-full max-w-5xl mx-auto px-2 py-3">
        <Outlet />
      </div>
    </div>
  );
};
