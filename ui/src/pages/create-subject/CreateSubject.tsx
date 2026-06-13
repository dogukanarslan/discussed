import { apiPost } from '@/api';
import type { UserData, SubjectData } from '@/types/api';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  user: UserData;
}

export const CreateSubject = (props: Props) => {
  const { user } = props;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const subject = await apiPost<SubjectData>('/api/subjects', {
      name,
      description,
      user_id: user.id,
    });

    navigate(`/subjects/${subject.id}`);
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
