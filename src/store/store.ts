import { configureStore } from '@reduxjs/toolkit'
import usersSlice from './reducers/users.slice'
import positionsSlice from './reducers/positions.slice'
import signUpSlice from './reducers/sign-up.slice'

export const store = configureStore({
	reducer: {
		users: usersSlice,
		positions: positionsSlice,
		signup: signUpSlice,
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
