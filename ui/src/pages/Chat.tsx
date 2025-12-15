import {MessageForm} from '../MessageForm';
import {MessageList} from '../MessageList';
import {Header} from '../Header';

interface Props {
  user: {username: string};
  setUser: (user: {username: string} | null) => void;
}

export const Chat = (props: Props) => {
  const {user, setUser} = props;

  return (
    <div className="container">
      <Header user={user} setUser={setUser} />
      <MessageList user={user} />
      <MessageForm />
    </div>
  );
};
