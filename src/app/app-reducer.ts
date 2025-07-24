import {createSlice} from "@reduxjs/toolkit"


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    themeMode: "dark" as ThemeMode,
  },
  reducers: (create)=> {
    return {
      changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
        state.themeMode = action.payload.themeMode
      })
    }
  }
})

export const appReducer = appSlice.reducer
export const {changeThemeModeAC} = appSlice.actions

export type ThemeMode = "dark" | "light"
//
// export const changeThemeModeAC = createAction<{ themeMode: ThemeMode }>("app/changeThemeMode")
//
// const initialState = {
//   themeMode: "light" as ThemeMode,
// }
//
// export const appReducer = createReducer(initialState, (builder) => {
//   builder.addCase(changeThemeModeAC, (state, action) => {
//     state.themeMode = action.payload.themeMode
//   })
// })
