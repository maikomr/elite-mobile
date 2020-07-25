export type Faculty = {
  id: number;
  title: string;
  description?: string;
  careers?: number[];
};

export type FacultyMap = { [id: string]: Faculty };
