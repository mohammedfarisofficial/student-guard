import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({
    name: 'user',
    initialState: {
        students: []
    },
    reducers: {
        setStudents: ( state,action ) => {
            state.students= action.payload
        },
        clearStudent: (state,action) => {
            state.students = []
        }
    }
})


export const { setStudents,clearStudent } = userSlice.actions;
export default userSlice.reducer