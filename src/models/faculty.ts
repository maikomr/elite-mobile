export type Faculty = {
  id: number;
  name: string;
  description?: string;
};

export type FacultyMap = { [id: string]: Faculty };
