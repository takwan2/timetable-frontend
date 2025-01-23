'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useTimetable } from '../TimetableContext';
import { unregisterLesson } from '../api/http';
import { Lesson } from './types';

interface CardProps {
  lesson: Lesson;
}

export default function Card ({ lesson } : CardProps) {
  const { fetchData } = useTimetable();

  const deleteLesson = async (id: string): Promise<void> => {
    try {
      await unregisterLesson(id);
      await fetchData();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      alert("授業の削除に失敗しました");
    }
  };

  return (
    <div className="card bg-info bg-gradient bg-opacity-75" key={lesson.id}>
      <div className="card-body p-2">
        <button
          type="button"
          className="ml-2 btn btn-light btn-sm p-1 float-end"
          onClick={() => deleteLesson(lesson.id)}
        >
          <FontAwesomeIcon
            icon={faTrash}
            className="fa-fw ml-2 btn btn-light btn-sm p-1 float-right"
          />
        </button>
        <h5 className="card-title mb-1">{lesson.subject.name}</h5>
        <p className="card-text ml-2 mb-1">
          <em>{lesson.teacher.name}</em>
        </p>
        <p className="card-text ml-2">{lesson.studentGroup.name}</p>
      </div>
    </div>
  );
};
