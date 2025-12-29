import {useEffect, useState} from 'react';

import './Rooms.css';

export const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch(`/api/rooms`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  return (
    <div className="rooms">
      <h4>Rooms</h4>
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
  );
};
