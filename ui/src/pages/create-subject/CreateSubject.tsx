import { useState } from 'react';
import { useNavigate } from 'react-router';

import type { UserData } from '@/types/api';
import { useCreateSubject } from '@/hooks/useCreateSubject';

interface Props {
  user: UserData;
}

export const CreateSubject = (props: Props) => {
  const { user } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();
  const { createSubject, isLoading } = useCreateSubject();

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = await createSubject(name, description, user.id);

    if (subject) {
      navigate(`/subjects/${subject.id}`);
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
        <button disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create New Subject'}
        </button>
      </form>
    </div>
  );
};
