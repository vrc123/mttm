import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Recieves {
    longFh: string,
    longMiddle: string,
    longBh: string,
    halfLongFh: string,
    halfLongMiddle: string,
    halfLongBh: string,
    shortFh: string,
    shortMiddle: string,
    shortBh: string,
}

export interface RecievesState {
    fhRecieves: Recieves,
    bhRecieves: Recieves,
}

const initialState: RecievesState = {
    fhRecieves: {
        longFh: '',
        longMiddle: '',
        longBh: '',
        halfLongFh: '',
        halfLongMiddle: '',
        halfLongBh: '',
        shortFh: '',
        shortMiddle: '',
        shortBh: '',
    },
    bhRecieves: {
        longFh: '',
        longMiddle: '',
        longBh: '',
        halfLongFh: '',
        halfLongMiddle: '',
        halfLongBh: '',
        shortFh: '',
        shortMiddle: '',
        shortBh: '',
    },
}

export const recievesSlice = createSlice({
    name: 'recieves',
    initialState,
    reducers: {
        saveFhRecieves: (state, action: PayloadAction<Recieves>) => {
            state.fhRecieves.longFh = action.payload.longFh
            state.fhRecieves.longMiddle = action.payload.longMiddle
            state.fhRecieves.longBh = action.payload.longBh
            state.fhRecieves.halfLongFh = action.payload.halfLongFh
            state.fhRecieves.halfLongMiddle = action.payload.halfLongMiddle
            state.fhRecieves.halfLongBh = action.payload.halfLongBh
            state.fhRecieves.shortFh = action.payload.shortFh
            state.fhRecieves.shortMiddle = action.payload.shortFh
            state.fhRecieves.shortBh = action.payload.shortFh
        },
        saveBhRecieves: (state, action: PayloadAction<Recieves>) => {
            state.bhRecieves.longFh = action.payload.longFh
            state.bhRecieves.longMiddle = action.payload.longMiddle
            state.bhRecieves.longBh = action.payload.longBh
            state.bhRecieves.halfLongFh = action.payload.halfLongFh
            state.bhRecieves.halfLongMiddle = action.payload.halfLongMiddle
            state.bhRecieves.halfLongBh = action.payload.halfLongBh
            state.bhRecieves.shortFh = action.payload.shortFh
            state.bhRecieves.shortMiddle = action.payload.shortFh
            state.bhRecieves.shortBh = action.payload.shortFh
        }
    },
})

export const { saveFhRecieves, saveBhRecieves } = recievesSlice.actions

export default recievesSlice.reducer