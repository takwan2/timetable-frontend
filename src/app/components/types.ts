export interface Lesson {
  id: string;
  timeslot: Timeslot | null;
  room: Room | null;
  teacher: Teacher;
  subject: Subject;
  studentGroup: StudentGroup;
}

export interface Room {
  id: string;
  name: string;
}

export interface Timeslot {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface Teacher {
  id: string;
  name: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface StudentGroup {
  id: string;
  name: string;
}

export interface TimeTable {
  roomList: Room[];
  timeslotList: Timeslot[];
  lessonList: Lesson[];
}

export interface ModalProps {
  onClose: () => void;
  show: boolean;
}