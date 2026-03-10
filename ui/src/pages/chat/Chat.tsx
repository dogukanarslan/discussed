import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MessageWrapper } from '@/pages/chat/MessageWrapper/MessageWrapper';
import { apiFetch } from '@/api';

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
    apiFetch(`/api/rooms`)
      .then((res) => {
        if (!res.ok) {
          throw Error('Error');
        }
        return res.json();
      })
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
    <div className="flex flex-col gap-4 h-full">
      <h3 className="text-lg font-semibold">Chat</h3>
      <select
        value={selectedRoomId || ''}
        onChange={(e) => setSelectedRoomId(Number(e.target.value))}
      >
        <option value="" hidden disabled>
          Select a room
        </option>
        {rooms.map((room) => (
          <option value={room.id} key={room.id}>
            {room.name}
          </option>
        ))}
      </select>

      {selectedRoomId && (
        <MessageWrapper user={user} selectedRoomId={selectedRoomId} />
      )}
    </div>
  );
};
