import { Navigate, Outlet } from 'react-router';
import type { UserData } from '@/types/api';
import { Header } from '@/components/Header';

interface Props {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
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
