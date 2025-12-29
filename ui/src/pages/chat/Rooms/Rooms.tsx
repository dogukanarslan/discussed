import {useEffect, useState} from 'react';

import './Rooms.css';

export const Rooms = () => {
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState<{name: string; id: number}[]>([]);

  useEffect(() => {
    fetch(`/api/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = JSON.parse(sessionStorage.getItem('user') || '""');

    if (!user) {
      return;
    }

    fetch(`/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: roomName,
        user_id: 1
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setRooms([...rooms, data]);
        setRoomName('');
      });
  };

  return (
    <div className="rooms">
      <h4>Rooms</h4>
      <div>
        {rooms.length > 0 ? (
          <ul>
            {rooms.map((room) => (
              <li key={room.id} className="room">
                {room.name}
              </li>
            ))}
          </ul>
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
          <button>+</button>
        </div>
      </form>
    </div>
  );
};
