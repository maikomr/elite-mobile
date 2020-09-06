export type Faculty = {
  id: string;
  name: string;
  description: string;
  admissionTypes: string[];
  admissionPeriods: string[];
};

export type FacultyMap = { [id: string]: Faculty };
