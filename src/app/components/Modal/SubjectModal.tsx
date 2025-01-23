import { useState } from "react";
import BaseModal from "./BaseModal";
import { registerSubject } from "../../api/http";
import { ModalProps } from "../types";

export default function SubjectModal({ onClose, show} : ModalProps) {
  const [subject, setSubject] = useState("");

  const handleRegister = async () => {
    if (!subject.trim()) {
      alert("教科名を入力してください");
      return;
    }

    try {
      const postData = {
        name: subject
      };
      await registerSubject(postData);
      onClose();
      setSubject("");
    } catch (error) {
      console.error("Error registering teacher:", error);
      alert("教科の登録に失敗しました");
    }
  };
  
  return (
    <BaseModal title="教科追加" onClose={onClose} show={show} onRegister={handleRegister}>
      <div className="form-group">
          <label htmlFor="subject_name">教科名</label>
          <input type="text" className="form-control" id="subject_name" required value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
    </BaseModal>
  );
}