import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todoData: {
        category:"",
        title:"",
        description:"",
        status:"",
        startDate:null,
        endDate:null
    },
    taskRefers: false,
    allTodos: [],
    totalIncompleteTodos:[],
    totalOnGoingTodos:[],
    totalCompleteTodos:[]
}

const todoSlice = createSlice({
    name:"settingTodo",
    initialState,
    reducers:{
        setTodoData: (state,action) =>{
            state.todoData[action.payload.name] = action.payload.value;
        },
        setStartDate: (state,action) =>{
            state.todoData.startDate = action.payload
        },
        setEndDate: (state,action) =>{
            state.todoData.endDate = action.payload
        },
        setTaskRefers: (state) =>{
            state.taskRefers = !state.taskRefers
        },
        setAllTodo:(state,action) =>{
            state.allTodos = action.payload
        },
        setTotalIncompleteTodo: (state,action) =>{
            state.totalIncompleteTodos = action.payload
        },
        setTotalOnGoingTodo: (state,action) =>{
            state.totalOnGoingTodos = action.payload
        },
        setTotalCompletedTodo: (state,action) =>{
            state.totalCompleteTodos = action.payload
        }
    }
})
export const{setTodoData,setStartDate,setEndDate,setTaskRefers,setAllTodo,
    setTotalIncompleteTodo,setTotalOnGoingTodo,setTotalCompletedTodo} = todoSlice.actions
export default todoSlice.reducer