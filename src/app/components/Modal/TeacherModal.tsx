import { useState } from "react";
import BaseModal from "./BaseModal";
import { registerTeacher } from "../../api/http";
import { ModalProps } from "../types";

export default function TeacherModal({ onClose, show}: ModalProps) {
  const [selectedTeacher, setSelectedTeacher] = useState("");

  const handleRegister = async () => {
    if (!selectedTeacher.trim()) {
      alert("先生名を入力してください");
      return;
    }

    try {
      const postData = {
        name: selectedTeacher
      };
      await registerTeacher(postData);
      onClose();
      setSelectedTeacher("");
    } catch (error) {
      console.error("Error registering teacher:", error);
      alert("先生の登録に失敗しました");
    }
  };
  
  return (
    <BaseModal title="先生追加" onClose={onClose} show={show} onRegister={handleRegister}>
      <div className="form-group">
          <label htmlFor="teacher_name">先生名</label>
          <input type="text" className="form-control" id="teacher_name" required value={selectedTeacher} onChange={(e) => setSelectedTeacher(e.target.value)} />
      </div>
    </BaseModal>
  );
}