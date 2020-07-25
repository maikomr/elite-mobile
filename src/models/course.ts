export type Course = {
  id: number;
  duration: number;
  price: number;
}

export type CourseMap = { [id: string]: Course };
