import { configureStore } from '@reduxjs/toolkit'
import todoReducers from '../Features/todosSlice'
import authAndUserReducers from '../Features/AuthSlcie'
export const store = configureStore({
  reducer: {
    setTodoData:todoReducers,
    Auth:authAndUserReducers,
  },
})