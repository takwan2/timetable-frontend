import axios from 'axios';
import { ENDPOINT } from '../constants'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export async function fetchTable() {
  const response = await axios.get(`${ENDPOINT}/timeTable/`);

  return response.data;
}

export async function solve() {
  const response = await axios.post(`${ENDPOINT}/timeTable/solve`);

  return response.data;
}

export async function stopSolve() {
  const response = await axios.post(`${ENDPOINT}/timeTable/stopSolving`);

  return response.data;
}

export async function fetchTeacher() {
  const response = await axios.get(`${ENDPOINT}/teachers/`);

  return response.data;
}

export async function registerTeacher(data) {
  const response = await axios.post(`${ENDPOINT}/teachers/`, data);

  return response.data;
}

export async function fetchSubject() {
  const response = await axios.get(`${ENDPOINT}/subjects/`);
  
  return response.data;
}

export async function registerSubject(data) {
  const response = await axios.post(`${ENDPOINT}/subjects/`, data);

  return response.data;
}

export async function fetchStudentGroup() {
  const response = await axios.get(`${ENDPOINT}/studentgroups/`);

  return response.data;
}

export async function registerStudentGroup(data) {
  const response = await axios.post(`${ENDPOINT}/studentgroups/`, data);

  return response.data;
}

export async function fetchRoom() {
  const response = await axios.get(`${ENDPOINT}/rooms/`);

  return response.data;
}

export async function registerRoom(data) {
  const response = await axios.post(`${ENDPOINT}/rooms/`, data);

  return response.data;
}

export async function fetchLesson() {
  const response = await axios.get(`${ENDPOINT}/lessons/`);

  return response.data;
}

export async function registerLesson(data) {
  const response = await axios.post(`${ENDPOINT}/lessons/`, data);
  
  return response.data;
}

export async function unregisterLesson(lessonId) {
  const response = await axios.delete(`${ENDPOINT}/lessons/${lessonId}`);
  
  return response;
}