import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    tasksList: [],
    selectedTask: {}
}

const tasksSlice = createSlice({
    name: "tasksSlice",
    initialState,
    reducers: {
        addTaskToList: (state, action) => {
            const id = Math.random() * 100
            let task = { ...action.payload, id }
            state.tasksList.push(task)
        },
        removeTask: (state, action) => {
            state.tasksList = state.tasksList.filter((task) => task.id !== action.payload.id)
        },
        updateInTask: (state, action) => {
            state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
        },
        selectedInTask: (state, action) => {
            state.selectedTask = action.payload
        }
    }
})

export const { addTaskToList, removeTask, updateInTask, selectedInTask } = tasksSlice.actions
export default tasksSlice.reducer