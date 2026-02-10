import { Navigate, Outlet } from 'react-router';
import { Header } from './components/Header';

interface Props {
  user: { username: string } | null;
  setUser: (user: { username: string } | null) => void;
}

export const Layout = (props: Props) => {
  const { user, setUser } = props;

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className="main">
        <Outlet />
      </div>
    </>
  );
};
