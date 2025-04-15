import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import vacancyReducer from '../features/vacancies/vacancySlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        vacancies: vacancyReducer
    },
})

// Infer the `State` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch