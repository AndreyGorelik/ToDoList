import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../components/auth/authSlice'
import calendarSlice from '../components/calendar/calendarSlice'
import addTaskFormSlice from '../components/addTaskForm/addTaskFormSlice'
import allTasks from "../components/wrapperSlice"

export const store = configureStore({
  reducer: {
    authSlice,
    calendarSlice,
    allTasks,
    addTaskFormSlice
  },
});