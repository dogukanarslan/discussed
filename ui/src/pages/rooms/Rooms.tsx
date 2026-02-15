import { useEffect, useState } from 'react';
import { RoomListItem } from './RoomListItem';
import { apiFetch } from '../../api';

type Room = {
  id: number;
  name: string;
  description?: string | null;
};

export const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        user_id: 1,
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

        setName('');
        setDescription('');
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
    <div className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold">Rooms</h3>
      <form className="grid gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button className="w-full">Create New Room</button>
      </form>

      {rooms && rooms.length > 0 ? (
        <div className="flex flex-col gap-3">
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
