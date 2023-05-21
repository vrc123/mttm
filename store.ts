import { configureStore } from '@reduxjs/toolkit'
import analysisReducer from './src/features/analysisSlice'
import servesReducer from './src/features/servesSlice'
import recievesReducer from './src/features/recievesSlice'

export const store = configureStore({
  reducer: {
    analysis: analysisReducer,
    serves: servesReducer,

    
    recieves: recievesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch