import {MessageForm} from '../MessageForm/MessageForm';
import {MessageList} from '../MessageList/MessageList';

import './MessageWrapper.css';

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
