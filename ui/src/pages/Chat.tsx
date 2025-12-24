import {Header} from '../Header';
import {ConnectedUsers} from '../ConnectedUsers';
import {MessageWrapper} from '../MessageWrapper';

interface Props {
  user: {username: string};
  setUser: (user: {username: string} | null) => void;
}

export const Chat = (props: Props) => {
  const {user, setUser} = props;

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
