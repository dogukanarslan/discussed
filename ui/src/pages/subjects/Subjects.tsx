import { useEffect, useState } from 'react';
import { SubjectList, type SubjectModel } from './SubjectList';

export const Subjects = () => {
  const [subjects, setSubjects] = useState<SubjectModel[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/subjects`);
      const data = await res.json();

      setSubjects(data);
    })();
  }, []);

  return (
    <div>
      <SubjectList subjects={subjects} />
    </div>
  );
};
