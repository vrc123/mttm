import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ServesState {
    fhServesId: number,
}

const initialState: ServesState = {
    fhServesId: 0,
}

export const servesSlice = createSlice({
    name: 'serves',
    initialState,
    reducers: {
        saveFhServesId: (state, action: PayloadAction<number>) => {
            state.fhServesId = action.payload
        },
    },
})

export const { saveFhServesId } = servesSlice.actions

export default servesSlice.reducer