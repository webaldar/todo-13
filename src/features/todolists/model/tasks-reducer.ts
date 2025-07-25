import {createSlice, nanoid} from "@reduxjs/toolkit"
import {createTodolistAC, deleteTodolistAC} from "@/features/todolists/model/todolists-reducer.ts";

export const tasksSlice = createSlice({
    name: 'todolists',
    initialState: {} as TasksState,
    reducers: (create) => {
        return {
            deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                if (index !== -1) {
                    tasks.splice(index, 1)
                }
            }),
            createTaskAC: create.reducer<{ todolistId: string; title: string }>((state, action) => {
                const newTask: Task = {title: action.payload.title, isDone: false, id: nanoid()}
                state[action.payload.todolistId].unshift(newTask)
            }),
            changeTaskStatusAC: create.reducer<{
                todolistId: string;
                taskId: string;
                isDone: boolean
            }>((state, action) => {
                const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
                if (task) {
                    task.isDone = action.payload.isDone
                }
            }),
            changeTaskTitleAC: create.reducer<{
                todolistId: string;
                taskId: string;
                title: string
            }>((state, action) => {
                const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
                if (task) {
                    task.title = action.payload.title
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodolistAC, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(deleteTodolistAC, (state, action) => {
                delete state[action.payload.id]
            })
    }
})

export const tasksReducer = tasksSlice.reducer

export const {deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC} = tasksSlice.actions
// export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>("tasks/deleteTask")
// export const createTaskAC = createAction<{ todolistId: string; title: string }>("tasks/createTask")
// export const changeTaskStatusAC = createAction<{ todolistId: string; taskId: string; isDone: boolean }>(
//   "tasks/changeTaskStatus",
// )
// export const changeTaskTitleAC = createAction<{ todolistId: string; taskId: string; title: string }>(
//   "tasks/changeTaskTitle",
// )
//
// const initialState: TasksState = {}

// export const tasksReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(deleteTaskAC, (state, action) => {
//       const tasks = state[action.payload.todolistId]
//       const index = tasks.findIndex((task) => task.id === action.payload.taskId)
//       if (index !== -1) {
//         tasks.splice(index, 1)
//       }
//     })
//     .addCase(createTaskAC, (state, action) => {
//       const newTask: Task = { title: action.payload.title, isDone: false, id: nanoid() }
//       state[action.payload.todolistId].unshift(newTask)
//     })
//     .addCase(changeTaskStatusAC, (state, action) => {
//       const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
//       if (task) {
//         task.isDone = action.payload.isDone
//       }
//     })
//     .addCase(changeTaskTitleAC, (state, action) => {
//       const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
//       if (task) {
//         task.title = action.payload.title
//       }
//     })
//     .addCase(createTodolistAC, (state, action) => {
//       state[action.payload.id] = []
//     })
//     .addCase(deleteTodolistAC, (state, action) => {
//       delete state[action.payload.id]
//     })
// })

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type TasksState = Record<string, Task[]>
