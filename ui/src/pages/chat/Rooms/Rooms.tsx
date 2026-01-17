import { useState } from 'react';

import './Rooms.css';
import { RoomItem } from './RoomItem';

interface Props {
  rooms: { name: string; id: number }[];
  setRooms: (newRooms: { id: number; name: string }[]) => void;
  selectedRoomId: number;
  setSelectedRoomId: (roomId: number) => void;
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
      }
    });
  };

  const changeRoom = (roomId: number) => {
    setSelectedRoomId(roomId);
  };

  return (
    <div className="rooms">
      <h4>Rooms</h4>
      <div>
        {rooms.length > 0 ? (
          <>
            {rooms.map((room) => (
              <RoomItem
                key={room.id}
                name={room.name}
                handleDelete={() => deleteRoom(room.id)}
                changeRoom={() => changeRoom(room.id)}
                selected={selectedRoomId === room.id}
              />
            ))}
          </>
        ) : (
          'No connected users'
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
