"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { fetchTable } from "./api/http";
import { TimeTable } from "./components/types";

interface TimetableContextType {
  timeTable: TimeTable;
  fetchData: () => Promise<void>;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

interface TimetableProviderProps {
  children: ReactNode;
}

export function TimetableProvider({ children }: TimetableProviderProps) {
  const [timeTable, setTimeTable] = useState<TimeTable>({ roomList: [], timeslotList: [], lessonList: [] });

  const fetchData = async () => {
    try {
      const data = await fetchTable();
      setTimeTable(data);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  return (
    <TimetableContext.Provider value={{ timeTable, fetchData }}>
      {children}
    </TimetableContext.Provider>
  );
}

export function useTimetable(): TimetableContextType {
  const context = useContext(TimetableContext);
  if (!context) {
    throw new Error("useTimetable must be used within a TimetableProvider");
  }
  return context;
}