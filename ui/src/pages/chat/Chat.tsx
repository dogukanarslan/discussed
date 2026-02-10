import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Rooms } from './Rooms/Rooms';
import { MessageWrapper } from './MessageWrapper/MessageWrapper';

interface Props {
  user: { username: string };
}

export const Chat = (props: Props) => {
  const { user } = props;

  const [selectedRoomId, setSelectedRoomId] = useState<number>();
  const [rooms, setRooms] = useState<{ name: string; id: number }[]>([]);

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  useEffect(() => {
    if (
      !user &&
      location.pathname !== 'signin' &&
      location.pathname !== 'signup'
    ) {
      navigate('/signin');
    }
  }, [user, location, navigate]);

  useEffect(() => {
    if (!selectedRoomId && rooms.length > 0 && rooms[0].id) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [rooms, selectedRoomId, setSelectedRoomId]);

  if (!user) {
    return;
  }

  return (
    <>
      <Rooms
        rooms={rooms}
        selectedRoomId={selectedRoomId}
        changeRoom={(roomId) => setSelectedRoomId(roomId)}
      />
      {selectedRoomId && (
        <MessageWrapper user={user} selectedRoomId={selectedRoomId} />
      )}
    </>
  );
};
