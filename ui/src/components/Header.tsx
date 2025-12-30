import './Header.css';

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
    <div className="header">
      <h3>Discussed</h3>
      <div className="header__info">
        <h4 className="header__heading">{user.username}</h4>
        <div>
          <button onClick={handleSignout}>Sign out</button>
        </div>
      </div>
    </div>
  );
};
