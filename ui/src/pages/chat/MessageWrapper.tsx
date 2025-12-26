import {MessageForm} from './MessageForm';
import {MessageList} from './MessageList';

interface Props {
  user: {username: string};
}

export const MessageWrapper = (props: Props) => {
  const {user} = props;

  return (
    <div className="message-wrapper">
      <MessageList user={user} />
      <MessageForm />
    </div>
  );
};
