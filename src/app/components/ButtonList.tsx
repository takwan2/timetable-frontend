import LessonModal from "./Modal/LessonModal";
import TeacherModal from "./Modal/TeacherModal";
import SubjectModal from "./Modal/SubjectModal";
import RoomModal from "./Modal/RoomModal";
import StudentGroupModal from "./Modal/StudentGroupModal";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function ButtonList() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const closeModal = () => setActiveModal(null);
  
  return (
    <>
      <div className="mb-4">
        <button type="button" className="btn btn-primary me-1" onClick={() => setActiveModal("lesson")}>
          <FontAwesomeIcon icon={faPlus} />
          <span>授業追加</span>
        </button>
        {/* <button type="button" className="btn btn-secondary me-1" onClick={() => setActiveModal("room")}>
          <FontAwesomeIcon icon={faPlus} />
          <span>教室追加</span>
        </button> */}
        <button type="button" className="btn btn-secondary me-1" onClick={() => setActiveModal("teacher")}>
          <FontAwesomeIcon icon={faPlus} />
          <span>先生追加</span>
        </button>
        <button type="button" className="btn btn-secondary me-1" onClick={() => setActiveModal("subject")}>
          <FontAwesomeIcon icon={faPlus} />
          <span>教科追加</span>
        </button>
        <button type="button" className="btn btn-secondary me-1" onClick={() => setActiveModal("studentGroup")}>
          <FontAwesomeIcon icon={faPlus} />
          <span>学年追加</span>
        </button>
      </div>

      <LessonModal onClose={closeModal} show={activeModal === "lesson"}/>
      <TeacherModal onClose={closeModal} show={activeModal === "teacher"}/>
      {/* <RoomModal onClose={closeModal} show={activeModal === "room"}/> */}
      <SubjectModal onClose={closeModal} show={activeModal === "subject"}/>
      <StudentGroupModal onClose={closeModal} show={activeModal === "studentGroup"}/>
    </>
  );
}