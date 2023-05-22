import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Serves {
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

export interface ServesState {
    fhServes: Serves,
    bhServes: Serves,
}

const initialState: ServesState = {
    fhServes: {
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
    bhServes: {
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

export const servesSlice = createSlice({
    name: 'serves',
    initialState,
    reducers: {
        saveFhServes: (state, action: PayloadAction<Serves>) => {
            state.fhServes.longFh = action.payload.longFh
            state.fhServes.longMiddle = action.payload.longMiddle
            state.fhServes.longBh = action.payload.longBh
            state.fhServes.halfLongFh = action.payload.halfLongFh
            state.fhServes.halfLongMiddle = action.payload.halfLongMiddle
            state.fhServes.halfLongBh = action.payload.halfLongBh
            state.fhServes.shortFh = action.payload.shortFh
            state.fhServes.shortMiddle = action.payload.shortFh
            state.fhServes.shortBh = action.payload.shortFh
        },
        saveBhServes: (state, action: PayloadAction<Serves>) => {
            state.bhServes.longFh = action.payload.longFh
            state.bhServes.longMiddle = action.payload.longMiddle
            state.bhServes.longBh = action.payload.longBh
            state.bhServes.halfLongFh = action.payload.halfLongFh
            state.bhServes.halfLongMiddle = action.payload.halfLongMiddle
            state.bhServes.halfLongBh = action.payload.halfLongBh
            state.bhServes.shortFh = action.payload.shortFh
            state.bhServes.shortMiddle = action.payload.shortFh
            state.bhServes.shortBh = action.payload.shortFh
        }
    },
})

export const { saveFhServes, saveBhServes } = servesSlice.actions

export default servesSlice.reducer