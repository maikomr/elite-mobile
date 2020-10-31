export type Subject = {
  id?: string;
  name: string;
  duration: string;
  hourlyRate: number;
  monthlyRate: number;
}

export type SubjectMap = { [id: string]: Subject };

export type SelectedSubjectMap = { [id: string]: boolean };
