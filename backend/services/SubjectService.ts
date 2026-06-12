import { SubjectModel } from '../models/subjectModel.js';

export const SubjectService = {
  getById(subjectId: number) {
    const subject = SubjectModel.getById(subjectId);
    if (!subject) {
      throw { status: 404, message: 'Subject not found' };
    }

    return subject;
  },
  getAll() {
    return SubjectModel.getAll();
  },
  create({
    name,
    description,
    user_id,
  }: {
    name: string;
    description: string | null;
    user_id: number;
  }) {
    if (!user_id) {
      throw { status: 400, message: 'user_id is required' };
    }

    if (!name) {
      throw { status: 400, message: 'name is required' };
    }

    const { id } = SubjectModel.create(name, description, user_id);
    return SubjectModel.getById(id);
  },
  delete(subjectId: number) {
    const deletedSubjectId = SubjectModel.delete(subjectId);
    if (!deletedSubjectId) {
      throw { status: 404, message: 'Subject not found' };
    }

    return deletedSubjectId;
  },
};
