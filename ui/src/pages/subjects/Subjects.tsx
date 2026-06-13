import { SubjectList } from './SubjectList';
import { useSubjects } from '@/hooks/useSubjects';

export const Subjects = () => {
  const { data: subjects = [], loading, error } = useSubjects();

  if (loading) {
    return 'Loading...';
  }

  if (error) {
    return error;
  }

  return <SubjectList subjects={subjects} />;
};
