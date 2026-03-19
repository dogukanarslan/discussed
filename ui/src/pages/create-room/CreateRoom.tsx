import { apiFetch } from '@/api';
import { CreateRoomForm } from '../rooms/CreateRoomForm';
import { useNavigate } from 'react-router';

export const CreateRoom = () => {
  const navigate = useNavigate();

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
      .then(() => {
        navigate('/rooms');
      });
  };
  return (
    <div>
      <CreateRoomForm onCreate={handleSubmit} />
    </div>
  );
};
