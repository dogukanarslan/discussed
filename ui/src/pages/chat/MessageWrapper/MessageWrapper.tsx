import { MessageForm } from '../MessageForm/MessageForm';
import { MessageList } from '../MessageList/MessageList';

import './MessageWrapper.css';

interface Props {
  user: { username: string };
  selectedRoom?: { id: number; name: string };
}

export const MessageWrapper = (props: Props) => {
  const { user, selectedRoom } = props;

  if(!selectedRoom) {
    return;
  }

  return (
    <div className="message-wrapper">
      <div><b>Room: </b>{selectedRoom.name}</div>
      <MessageList user={user} selectedRoomId={selectedRoom.id} />
      <MessageForm roomId={selectedRoom.id} />
    </div>
  );
};
