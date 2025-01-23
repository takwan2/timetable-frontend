import { useState, useEffect } from "react";
import BaseModal from "./BaseModal";
import { fetchTeacher, fetchSubject, fetchStudentGroup, registerLesson } from "../../api/http";
import { useTimetable } from "../../TimetableContext";
import { Teacher, Subject, StudentGroup, ModalProps } from "../types";

export default function LessonModal({ onClose, show} : ModalProps) {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studentGroups, setStudentGroups] = useState<StudentGroup[]>([]);

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [selectedStudentGroup, setSelectedStudentGroup] = useState<string | null>(null);

  const { fetchData } = useTimetable();

  useEffect(() => {
    if (show) {
      fetchTeacher().then((data) => {
        setTeachers(data);
        if (data.length > 0) {
          setSelectedTeacher(data[0].id);
        }
      });
      fetchSubject().then((data) => {
        setSubjects(data);
        if (data.length > 0) {
          setSelectedSubject(data[0].id);
        }
      });
      fetchStudentGroup().then((data) => {
        setStudentGroups(data);
        if (data.length > 0) {
          setSelectedStudentGroup(data[0].id);
        }
      });
    }
  }, [show]);

  const handleRegister = async () => {
    try {
      const lessonData = {
        subject: { id: selectedSubject },
        teacher: { id: selectedTeacher },
        studentGroup: { id: selectedStudentGroup },
      };
      await registerLesson(lessonData);
      await fetchData();
      onClose();
    } catch (error) {
      console.error("Error registering lesson:", error);
      alert("授業の登録に失敗しました");
    }
  };
  
  return (
    <BaseModal title="授業" onClose={onClose} show={show} onRegister={handleRegister}>
      <div className="form-group mb-2">
        <label htmlFor="lesson_subject" className="mb-2">教科</label>
        <select className="form-control" id="lesson_subject" required onChange={(e) => setSelectedSubject(e.target.value)}>
          {
            subjects && subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group mb-2">
        <label htmlFor="lesson_teacher" className="mb-2">先生</label>
        <select className="form-control" id="lesson_teacher" required onChange={(e) => setSelectedTeacher(e.target.value)}>
          {
            teachers && teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group mb-4">
        <label htmlFor="lesson_studentGroup" className="mb-2">学年</label>
        <select className="form-control" id="lesson_studentGroup" required onChange={(e) => setSelectedStudentGroup(e.target.value)}>
          {
            studentGroups && studentGroups.map(studentGroup => (
              <option key={studentGroup.id} value={studentGroup.id}>{studentGroup.name}</option>
            ))
          }
        </select>
      </div>
    </BaseModal>
  );
}