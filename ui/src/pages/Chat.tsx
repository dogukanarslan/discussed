import {Header} from '../Header';
import {ConnectedUsers} from '../ConnectedUsers';
import {MessageWrapper} from '../MessageWrapper';
import {useEffect} from 'react';
import {socket} from '../socket';

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
        <ConnectedUsers />
        <MessageWrapper user={user} />
      </div>
    </>
  );
};
