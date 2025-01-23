"use client";
import { useTimetable } from "./TimetableContext";
import { solve, stopSolve } from "./api/http";
import { useEffect, useState } from "react";
import Timetable from "./components/Timetable";
import UnassignedLessons from "./components/UnsingedLesson";
import ButtonList from "./components/ButtonList";

export default function Home() {
  const { timeTable, fetchData } = useTimetable();
  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [autoRefreshIntervalId, setAutoRefreshIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startSolving = async (): Promise<void> => {
    try {
      await solve();
      setIsSolving(true);
    } catch (error) {
      console.error("Error startSolving:", error);
    }
  };

  const stopSolving = async (): Promise<void> => {
    try {
      await stopSolve();
      setIsSolving(false);
    } catch (error) {
      console.error("Error stopSolving:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isSolving) {
      if (autoRefreshIntervalId === null) {
        const id = setInterval(fetchData, 2000);
        setAutoRefreshIntervalId(id);
      }
    } else {
      if (autoRefreshIntervalId !== null) {
        clearInterval(autoRefreshIntervalId);
        setAutoRefreshIntervalId(null);
      }
    }
  }, [isSolving, autoRefreshIntervalId, fetchData]);

  return (
    <div className="container">
      <h1>時間割作成</h1>
      {isSolving ? (
        <button
          id="stopSolvingButton"
          type="button"
          className="btn btn-danger"
          onClick={stopSolving}
        >
          <span>ストップ</span>
        </button>
      ) : (
        <button
          id="solveButton"
          type="button"
          className="btn btn-success"
          onClick={startSolving}
        >
          <span>自動作成スタート</span>
        </button>
      )}
      <Timetable timeTable={timeTable} />
      <ButtonList />
      <UnassignedLessons timeTable={timeTable} />
    </div>
  );
}
