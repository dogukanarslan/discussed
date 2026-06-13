import type { UserModel } from '@/App';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  user: UserModel;
}

export const CreateSubject = (props: Props) => {
  const { user } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const res = await fetch('/api/subjects', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name, description, user_id: user.id }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate(`/subjects/${data.id}`)
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="space-y-2">
        <input
          placeholder="Subject name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Subject description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Create New Subject</button>
      </form>
    </div>
  );
};
