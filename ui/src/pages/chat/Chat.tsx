import { useLocation, useNavigate } from 'react-router';
import { Header } from '../../components/Header';
import { ConnectedUsers } from './ConnectedUsers/ConnectedUsers';
import { Rooms } from './Rooms/Rooms';
import { MessageWrapper } from './MessageWrapper/MessageWrapper';
import { useEffect, useState } from 'react';
import { socket } from '../../socket';

interface Props {
  user: { username: string };
  setUser: (user: { username: string } | null) => void;
}

export const Chat = (props: Props) => {
  const { user, setUser } = props;

  const [selectedRoomId, setSelectedRoomId] = useState(1);
  const [rooms, setRooms] = useState<{ name: string; id: number }[]>([]);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      socket.emit('user:join', user);
    }
  }, [user]);

  useEffect(() => {
    fetch(`/api/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  useEffect(() => {
    if (!location.pathname) {
      navigate('/chat');
    }

    if (
      !user &&
      location.pathname !== 'signin' &&
      location.pathname !== 'signup'
    ) {
      navigate('signin');
    }
  }, [user, location, navigate]);

  if (!user) {
    return;
  }

  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className="main">
        <div className="left-column">
          <ConnectedUsers />
          <Rooms
            rooms={rooms}
            setRooms={setRooms}
            selectedRoomId={selectedRoomId}
            setSelectedRoomId={setSelectedRoomId}
          />
        </div>
        <MessageWrapper user={user} selectedRoomId={selectedRoomId} />
      </div>
    </>
  );
};
