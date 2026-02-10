import { Link } from 'react-router';
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
      <div className="header__wrapper">
        <div className="header__left">
          <h3>Discussed</h3>
          <div className="header__menu">
            <Link to="/">Chat</Link>
            <Link to="/rooms">Rooms</Link>
          </div>
        </div>
        <div className="header__info">
          <h4 className="header__heading">{user.username}</h4>
          <button onClick={handleSignout}>Sign out</button>
        </div>
      </div>
    </div>
  );
};
