import { useState, useMemo } from 'react';
import { SubjectList } from './SubjectList';
import { useSubjects } from '@/hooks/useSubjects';
import type { SubjectData } from '@/types/api';
import { SortButtons, type SortOption } from './SortButtons';

const sortSubjects = (subjects: SubjectData[], sort: SortOption) => {
  if (sort === 'name') {
    return [...subjects].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'created_at') {
    return [...subjects].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  } else {
    return subjects;
  }
};

export const Subjects = () => {
  const [sort, setSort] = useState<SortOption>('default');

  const { data: subjects = [], isLoading, error } = useSubjects();

  const sortedSubjects = useMemo(
    () => sortSubjects(subjects, sort),
    [subjects, sort],
  );

  const changeSort = (option: SortOption) => {
    setSort(option);
  };

  if (isLoading) {
    return 'Loading...';
  }

  if (error) {
    return error;
  }

  return (
    <div className="space-y-4">
      <SortButtons sort={sort} changeSort={changeSort} />
      <SubjectList subjects={sortedSubjects} />
    </div>
  );
};
