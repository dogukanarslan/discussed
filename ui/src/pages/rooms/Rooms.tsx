import { useEffect, useState } from 'react';

import './Rooms.css';

type Room = {
  id: number;
  name: string;
};

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>();

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
      .then((data: Room) => {
        if (rooms) {
          setRooms([...rooms, data]);
        } else {
          setRooms([data]);
        }
        setRoomName('');
      });
  };

  const deleteRoom = (roomId: number) => {
    fetch(`/api/rooms/${roomId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        if (rooms) {
          setRooms(rooms.filter((room) => room.id !== roomId));
        }
      }
    });
  };

  useEffect(() => {
    fetch(`/api/rooms`)
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRooms(data);
      });
  }, []);

  return (
    <div className="rooms">
      <h3 className="rooms__title">Rooms</h3>
      <form className="rooms__add-form" onSubmit={handleSubmit}>
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

      {rooms && rooms.length > 0 ? (
        <div className="rooms__list">
          {rooms.map((room) => (
            <div key={room.id} className="rooms__room-item">
              <div className="rooms__room-name">{room.name}</div>
              <button onClick={() => deleteRoom(room.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        'No rooms created'
      )}
    </div>
  );
};
