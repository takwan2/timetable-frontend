import { useState } from "react";
import BaseModal from "./BaseModal";
import { registerRoom } from "../../api/http";
import { useTimetable } from "../../TimetableContext";

export default function RoomModal({ onClose, show}) {
  const [room, setRoom] = useState("");
  const { fetchData } = useTimetable();

  const handleRegister = async () => {
    if (!room.trim()) {
      alert("教室名を入力してください");
      return;
    }

    try {
      const postData = {
        name: room
      };
      await registerRoom(postData);
      await fetchData();
      onClose();
      setRoom("");
    } catch (error) {
      console.error("Error registering teacher:", error);
      alert("教室の登録に失敗しました");
    }
  };
  
  return (
    <BaseModal title="教室追加" onClose={onClose} show={show} onRegister={handleRegister}>
      <div className="form-group">
          <label htmlFor="room_name">教室名</label>
          <input type="text" className="form-control" id="room_name" required value={room} onChange={(e) => setRoom(e.target.value)} />
      </div>
    </BaseModal>
  );
}