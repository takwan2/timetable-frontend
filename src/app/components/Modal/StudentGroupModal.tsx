import { useState } from "react";
import BaseModal from "./BaseModal";
import { registerStudentGroup } from "../../api/http";
import { ModalProps } from "../types";

export default function StudentGroupModal({ onClose, show} : ModalProps) {
  const [studentGroup, setStudentGroup] = useState("");

  const handleRegister = async () => {
    if (!studentGroup.trim()) {
      alert("学年名を入力してください");
      return;
    }

    try {
      const postData = {
        name: studentGroup
      };
      await registerStudentGroup(postData);
      onClose();
      setStudentGroup("");
    } catch (error) {
      console.error("Error registering teacher:", error);
      alert("学年の登録に失敗しました");
    }
  };
  
  return (
    <BaseModal title="学年追加" onClose={onClose} show={show} onRegister={handleRegister}>
      <div className="form-group">
          <label htmlFor="studentGroup_name">学年名</label>
          <input type="text" className="form-control" id="studentGroup_name" required value={studentGroup} onChange={(e) => setStudentGroup(e.target.value)} />
      </div>
    </BaseModal>
  );
}