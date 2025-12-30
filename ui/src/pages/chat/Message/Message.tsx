import { formatTime } from '../../../constants';

import './Message.css';

interface Props {
  message: {
    username: string;
    message: string;
    created_at: string;
  };
  username: string;
}

export const Message = (props: Props) => {
  const { message, username } = props;

  const isCurrentUser = username === message.username;

  return (
    <div className="message">
      <div>
        <b>{isCurrentUser ? 'You' : message.username}</b>: {message.message}
      </div>
      <p>{formatTime(message.created_at)}</p>
    </div>
  );
};
