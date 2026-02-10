import { useEffect } from 'react';

import './Rooms.css';

interface Props {
  rooms: { name: string; id: number }[];
  selectedRoomId?: number;
  setSelectedRoomId: (roomId?: number) => void;
}

export const Rooms = (props: Props) => {
  const { rooms, selectedRoomId, setSelectedRoomId } = props;

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
      </div>
    </div>
  );
};
