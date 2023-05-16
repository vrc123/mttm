import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AnalysisState {
    date: string,
    opponentId: number,
    score: string,
    servesId: number,
    recievesId: number,
}

const initialState: AnalysisState = {
    date: '',
    opponentId: 0,
    score: '',
    servesId: 0,
    recievesId: 0,
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
        saveServesId: (state, action: PayloadAction<number>) => {
            state.servesId = action.payload
        },
        saveRecievesId: (state, action: PayloadAction<number>) => {
            state.recievesId = action.payload
        },
    },
})

export const { saveDate, saveOpponentId, saveScore, saveServesId, saveRecievesId } = analysisSlice.actions

export default analysisSlice.reducer