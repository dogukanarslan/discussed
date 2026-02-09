import { useEffect, useState } from 'react';

import './Rooms.css';

interface Props {
  rooms: { name: string; id: number }[];
  setRooms: (newRooms: { id: number; name: string }[]) => void;
  selectedRoomId?: number;
  setSelectedRoomId: (roomId?: number) => void;
}

export const Rooms = (props: Props) => {
  const { rooms, setRooms, selectedRoomId, setSelectedRoomId } = props;

  const [roomName, setRoomName] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user') || '""');

    if (!user) {
      return;
    }

    fetch(`/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: roomName,
        user_id: 1,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms([...rooms, data]);
        setRoomName('');
      });
  };

  const deleteRoom = (roomId: number) => {
    fetch(`/api/rooms/${roomId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        setRooms(rooms.filter((room) => room.id !== roomId));
        if (selectedRoomId === roomId) {
          setSelectedRoomId(undefined);
        }
      }
    });
  };

  const changeRoom = (roomId: number) => {
    setSelectedRoomId(roomId);
  };

  useEffect(() => {
    if (!selectedRoomId && rooms.length > 0 && rooms[0].id) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [rooms, selectedRoomId, setSelectedRoomId]);

  return (
    <div className="rooms">
      <div className="rooms__select">
        <select
          value={selectedRoomId || ''}
          onChange={(e) => changeRoom(Number(e.target.value))}
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
          <button onClick={() => deleteRoom(selectedRoomId)}>{`\u2613`}</button>
        )}
      </div>

      <form className="room-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
        />
        <div>
          <button>{`\u002b`}</button>
        </div>
      </form>
    </div>
  );
};
