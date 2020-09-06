export type Faculty = {
  id: string;
  name: string;
  description: string;
  admissionTypes: string[];
  admissionPeriods: string[];
  careers: string[];
  subjects: object[];
};

export type FacultyMap = { [id: string]: Faculty };
