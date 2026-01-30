import { MessageForm } from '../MessageForm/MessageForm';
import { MessageList } from '../MessageList/MessageList';

import './MessageWrapper.css';

interface Props {
  user: { username: string };
  selectedRoomId?: number;
}

export const MessageWrapper = (props: Props) => {
  const { user, selectedRoomId } = props;

  if (!selectedRoomId) {
    return;
  }

  return (
    <div className="message-wrapper">
      <MessageList user={user} selectedRoomId={selectedRoomId} />
      <MessageForm roomId={selectedRoomId} />
    </div>
  );
};
