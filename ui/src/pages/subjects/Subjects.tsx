import { SubjectList } from './SubjectList';
import { useSubjects } from '@/hooks/useSubjects';

export const Subjects = () => {
  const { data: subjects = [], isLoading, error } = useSubjects();

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return error;
  }

  return <SubjectList subjects={subjects} />;
};
