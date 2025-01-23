'use client';
import React from 'react';
import Card from './Card';
import { TimeTable, Lesson } from './types';

interface UnassignedLessonsProps {
  timeTable: TimeTable;
}

export default function UnassignedLessons({ timeTable }: UnassignedLessonsProps) {
  const filteredLessons = timeTable.lessonList?.filter((lesson: Lesson) => !lesson.timeslot || !lesson.room);

  return (
    <div className='row'>
      <h2>未割り当て授業</h2>
      {filteredLessons?.map((lesson: Lesson) => (
        <div className="col-md-4 mb-3" key={lesson.id}>
          <Card lesson={lesson} />
        </div>
      ))}
    </div>
  );
};