import { SubjectListItem } from './SubjectListItem';

export type SubjectModel = {
  id: number;
  name: string;
  description: string;
};

interface Props {
  subjects: SubjectModel[];
}

export const SubjectList = (props: Props) => {
  const { subjects } = props;

  return (
    <div className="space-y-2">
      {subjects.map((subject) => (
        <SubjectListItem
          key={subject.id}
          subject={subject}
          onDelete={() => null}
        />
      ))}
    </div>
  );
};
