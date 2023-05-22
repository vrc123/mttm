import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AnalysisState {
    date: string,
    opponentId: number,
    score: string,
}

const initialState: AnalysisState = {
    date: '',
    opponentId: 0,
    score: '',
}

export const analysisSlice = createSlice({
    name: 'analysis',
    initialState,
    reducers: {
        saveDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload
        },
        saveOpponentId: (state, action: PayloadAction<number>) => {
            state.opponentId = action.payload
        },
        saveScore: (state, action: PayloadAction<string>) => {
            state.score = action.payload
        },
    },
})

export const { saveDate, saveOpponentId, saveScore } = analysisSlice.actions

export default analysisSlice.reducer