'use client';
import React from "react";
import Card from "./Card";
import { TimeTable, Lesson } from "./types";

function getJapaneseDay(day: string): string {
  const dayMapping: { [key: string]: string } = {
    MONDAY: "月",
    TUESDAY: "火",
    WEDNESDAY: "水",
    THURSDAY: "木",
    FRIDAY: "金",
    SATURDAY: "土",
    SUNDAY: "日",
  };
  return dayMapping[day] || "";
}

interface TimetableProps {
  timeTable: TimeTable;
}

export default function Timetable ({ timeTable }: TimetableProps) {
  const findLesson = (timeslotId: string, roomId: string) => {
    const lesson = timeTable.lessonList.find(
      (lesson: Lesson) =>
        lesson.timeslot?.id === timeslotId && lesson.room?.id === roomId
    );
    return lesson ? <Card lesson={lesson}></Card> : "";
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>タイムテーブル</th>
          {timeTable.roomList.map((room) => (
            <th key={room.id}>{room.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {timeTable.timeslotList.map((timeslot) => (
          <tr key={timeslot.id}>
            <th>
              {getJapaneseDay(timeslot.dayOfWeek)} {timeslot.startTime.substring(0, 5)} - {timeslot.endTime.substring(0, 5)}
            </th>
            {timeTable.roomList.map((room) => (
              <td key={room.id}>{findLesson(timeslot.id, room.id)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};