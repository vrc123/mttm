import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RecievesState {
    fhRecievesId: number,
}

const initialState: RecievesState = {
    fhRecievesId: 0,
}

export const recievesSlice = createSlice({
    name: 'recieves',
    initialState,
    reducers: {
        saveFhRecievesId: (state, action: PayloadAction<number>) => {
            state.fhRecievesId = action.payload
        },
    },
})

export const { saveFhRecievesId } = recievesSlice.actions

export default recievesSlice.reducer