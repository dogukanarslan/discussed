import { Link } from 'react-router';

interface Props {
  user: { username: string };
  setUser: (user: { username: string } | null) => void;
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
          <h3 className="text-lg font-semibold">Discussed</h3>
          <nav className="flex gap-3 text-sm">
            <Link to="/" className="hover:underline">
              Chat
            </Link>
            <Link to="/rooms" className="hover:underline">
              Rooms
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
