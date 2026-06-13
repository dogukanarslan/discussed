import type { UserModel } from '@/App';
import { useState } from 'react';

interface Props {
  user: UserModel;
}

export const CreateSubject = (props: Props) => {
  const { user } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    fetch('/api/subjects', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name, description, user_id: user.id }),
    });
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
