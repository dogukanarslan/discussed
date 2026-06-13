import { apiPost } from '@/api';
import type { UserData } from '@/types/api';
import { useState } from 'react';
import { useParams } from 'react-router';
import { MessageList } from '../chat/MessageList/MessageList';
import { useSubjectDetail } from '@/hooks/useSubjectDetail';

interface Props {
  user: UserData;
}

export const SubjectDetail = (props: Props) => {
  const { user } = props;

  const [message, setMessage] = useState('');

  const { subjectId } = useParams() as { subjectId: string };

  const { data: subjectDetail, isLoading, error } = useSubjectDetail(subjectId);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await apiPost('/api/messages', {
      message,
      subject_id: subjectId,
      user_id: user.id,
    });
    setMessage('');
  };

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return error;
  }

  return (
    <div>
      <MessageList msgs={subjectDetail?.messages || []} user={user} />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="What are your thoughts?"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
};
