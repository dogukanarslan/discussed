import { useEffect, useState } from 'react';

import { RoomListItem } from './RoomListItem';
import { apiFetch } from '../../api';
import { CreateRoomForm } from './CreateRoomForm';

type Room = {
  id: number;
  name: string;
  description?: string | null;
};

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>();

  const handleSubmit = (name: string, description?: string) => {
    const user = JSON.parse(sessionStorage.getItem('user') || '""');

    if (!user) {
      return;
    }

    apiFetch(`/api/rooms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        user_id: user.id,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Error');
        }

        return res.json();
      })
      .then((data: Room) => {
        if (rooms) {
          setRooms([...rooms, data]);
        } else {
          setRooms([data]);
        }
      });
  };

  const deleteRoom = (roomId: number) => {
    apiFetch(`/api/rooms/${roomId}`, {
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
    apiFetch(`/api/rooms`)
      .then((res) => res.json())
      .then((data: Room[]) => {
        setRooms(data);
      });
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full">
      <h3 className="text-lg font-semibold">Rooms</h3>
      <CreateRoomForm onCreate={handleSubmit} />

      {rooms && rooms.length > 0 ? (
        <div className="flex flex-col gap-3 overflow-y-auto h-full">
          {rooms.map((room) => (
            <RoomListItem key={room.id} room={room} onDelete={deleteRoom} />
          ))}
        </div>
      ) : (
        'No rooms created'
      )}
    </div>
  );
};
