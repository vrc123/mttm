import { configureStore } from '@reduxjs/toolkit'
import analysisReducer from './src/features/analysisSlice'
import recievesReducer from './src/features/recievesSlice'

export const store = configureStore({
  reducer: {
    analysis: analysisReducer,
    recieves: recievesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch