import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ServesState {
    fhLongFh: string,
    fhLongMiddle: string,
    fhLongBh: string,
    fhHalfLongFh: string,
    fhHalfLongMiddle: string,
    fhHalfLongBh: string,
    fhShortFh: string,
    fhShortMiddle: string,
    fhShortBh: string,
    bhLongFh: string,
    bhLongMiddle: string,
    bhLongBh: string,
    bhHalfLongFh: string,
    bhHalfLongMiddle: string,
    bhHalfLongBh: string,
    bhShortFh: string,
    bhShortMiddle: string,
    bhShortBh: string,
}

const initialState: ServesState = {
    fhLongFh: '',
    fhLongMiddle: '',
    fhLongBh: '',
    fhHalfLongFh: '',
    fhHalfLongMiddle: '',
    fhHalfLongBh: '',
    fhShortFh: '',
    fhShortMiddle: '',
    fhShortBh: '',
    bhLongFh: '',
    bhLongMiddle: '',
    bhLongBh: '',
    bhHalfLongFh: '',
    bhHalfLongMiddle: '',
    bhHalfLongBh: '',
    bhShortFh: '',
    bhShortMiddle: '',
    bhShortBh: '',
}

export const servesSlice = createSlice({
    name: 'serves',
    initialState,
    reducers: {
        saveFhLongFh: (state, action: PayloadAction<string>) => {
            state.fhLongFh = action.payload
        },
        saveFhLongMiddle: (state, action: PayloadAction<string>) => {
            state.fhLongMiddle = action.payload
        },
        saveFhLongBh: (state, action: PayloadAction<string>) => {
            state.fhLongBh = action.payload
        },
        saveFhHalfLongFh: (state, action: PayloadAction<string>) => {
            state.fhHalfLongFh = action.payload
        },
        saveFhHalfLongMiddle: (state, action: PayloadAction<string>) => {
            state.fhHalfLongMiddle = action.payload
        },
        saveFhHalfLongBh: (state, action: PayloadAction<string>) => {
            state.fhHalfLongBh = action.payload
        },
        saveFhShortFh: (state, action: PayloadAction<string>) => {
            state.fhShortFh = action.payload
        },
        saveFhShortMiddle: (state, action: PayloadAction<string>) => {
            state.fhShortMiddle = action.payload
        },
        saveFhShortBh: (state, action: PayloadAction<string>) => {
            state.fhShortBh = action.payload
        },
    },
})

export const { saveFhLongFh, saveFhLongMiddle, saveFhLongBh, saveFhHalfLongFh, saveFhHalfLongMiddle, saveFhHalfLongBh, saveFhShortFh, saveFhShortMiddle, saveFhShortBh } = servesSlice.actions

export default servesSlice.reducer