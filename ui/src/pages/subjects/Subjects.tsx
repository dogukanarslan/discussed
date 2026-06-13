import { useEffect, useState } from 'react';
import type { SubjectData } from '@/types/api';
import { apiGet } from '@/api';
import { SubjectList } from './SubjectList';

export const Subjects = () => {
  const [subjects, setSubjects] = useState<SubjectData[]>([]);

  useEffect(() => {
    (async () => {
      const data = await apiGet<SubjectData[]>('/api/subjects');
      setSubjects(data);
    })();
  }, []);

  return (
    <div>
      <SubjectList subjects={subjects} />
    </div>
  );
};
