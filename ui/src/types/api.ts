export interface UserData {
  id: number;
  username: string;
}

export interface SubjectData {
  id: number;
  name: string;
  description: string;
}

export interface MessageData {
  id: number;
  message: string;
  username: string;
  created_at: string;
}

export interface SubjectDetailData {
  id: number;
  name: string;
  description: string;
  messages: MessageData[];
}

export interface ApiError {
  message: string;
}
