import {Header} from '../../components/Header';
import {ConnectedUsers} from './ConnectedUsers/ConnectedUsers';
import {Rooms} from './Rooms/Rooms';
import {MessageWrapper} from './MessageWrapper/MessageWrapper';
import {useEffect} from 'react';
import {socket} from '../../socket';

interface Props {
  user: {username: string};
  setUser: (user: {username: string} | null) => void;
}

export const Chat = (props: Props) => {
  const {user, setUser} = props;

  useEffect(() => {
    if (user) {
      socket.emit('user:join', user);
    }
  }, [user]);

  if (!user) {
    return;
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className="main">
        <div className="left-column">
          <ConnectedUsers />
          <Rooms />
        </div>
        <MessageWrapper user={user} />
      </div>
    </>
  );
};
