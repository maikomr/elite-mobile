export type Subject = {
  id: number;
  title: string;
  description?: string;
}

export type SubjectMap = { [id: string]: Subject };
