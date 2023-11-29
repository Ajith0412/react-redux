import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


const initialState = {
    tasksList: [],
    selectedTask: {},
    isLoading: false,
    error: ""
}

const BASE_URL = "http://localhost:8000/tasks"
//get using react-thunk

export const getTaskFromServer = createAsyncThunk(
    "tasks/getTaskFromServer", async (_, { rejectWithValue }) => {
        const response = await fetch(BASE_URL)
        if (response.ok) {
            const jsonData = await response.json()
            return jsonData
        } else {
            return rejectWithValue({ error: "No Data Found" })
        }
    }
)

//post using to local server

export const addTaskFromServer = createAsyncThunk(
    "tasks/addTaskFromServer",
    async (task, { rejectWithValue }) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL, options)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        } else {
            return rejectWithValue({ error: "Task Not added" })
        }
    }
)

//Patch using to local server

export const updateTaskToServer = createAsyncThunk(
    "tasks/updateTaskToServer", async (task, { rejectWithValue }) => {
        console.log(task)
        const option = {
            method: "PATCH",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }

        const response = await fetch(BASE_URL + "/" + task.id, option)
        if (response.ok) {
            const jsonResponse = await response.json()
            return jsonResponse
        }
        else {
            return rejectWithValue({ error: "Task Not Updated" })
        }
    }
)

//delete using local server -redux thunk

export const deleteFromServer = createAsyncThunk(
    "tasks/deleteFromServer", async (task, { rejectWithValue }) => {
        const option = {
            method: "DELETE",

        }
        const response = await fetch(BASE_URL + "/" + task.id, option)

        if (response.ok) {
            const jsonREsponse = await response.json()
            return jsonREsponse
        } else {
            return rejectWithValue({ error: "Task not deleted" })
        }
    }
)




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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTaskFromServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTaskFromServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ""
                state.tasksList = action.payload
            })
            .addCase(getTaskFromServer.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.error
                state.tasksList = []
            })

            .addCase(addTaskFromServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addTaskFromServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
                state.tasksList.push(action.payload)
            })
            .addCase(addTaskFromServer.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(updateTaskToServer.pending, (state) => {
                state.isLoading = true

            })
            .addCase(updateTaskToServer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = ""
                state.tasksList = state.tasksList.map((task) => task.id === action.payload.id ? action.payload : task)
            })
            .addCase(updateTaskToServer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload.error
            })
            .addCase(deleteFromServer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteFromServer.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ""

            })
            .addCase(deleteFromServer.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload.error
            })
    }
})

export const { addTaskToList, removeTask, updateInTask, selectedInTask } = tasksSlice.actions
export default tasksSlice.reducer