import type { UserModel } from '@/App';
import { Link } from 'react-router';

interface Props {
  user: UserModel;
  setUser: (user: UserModel | null) => void;
}

export const Header = (props: Props) => {
  const { user, setUser } = props;

  const handleSignout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <header className="h-header border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-full px-2">
        <div className="flex items-center gap-5">
          <Link to="/">
            <div className="text-lg font-semibold">Discussed</div>
          </Link>
          <nav className="flex gap-3 text-sm">
            <Link to="/subjects" className="hover:underline">
              Subjects
            </Link>
            <Link to="/subjects/create" className="hover:underline">
              Create Subject
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <h4 className="text-base font-semibold">{user.username}</h4>
          <button onClick={handleSignout}>Sign out</button>
        </div>
      </div>
    </header>
  );
};
