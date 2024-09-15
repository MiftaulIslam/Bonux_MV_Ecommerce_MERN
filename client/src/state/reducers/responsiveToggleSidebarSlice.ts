import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isOpen:false
}

const responsiveToggleSidebarSlice = createSlice({
    name: 'togglebar',
    initialState,
    reducers:{
        Togglebar(state){
            state.isOpen = !state.isOpen; 
        },
    }
})

export const { Togglebar } = responsiveToggleSidebarSlice.actions;

export default responsiveToggleSidebarSlice.reducer;