import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IData, IUser } from '../../interfaces/interfaces'
import axios from 'axios'
import { RootState } from '../store'

interface IUserState {
	status: 'loading' | 'successed' | 'rejected'
	error: string | null
	users: IUser[]
	userData: IData
}

const initialState: IUserState = {
	status: 'loading',
	error: null,
	users: [],
	userData: {
		count: 6,
		totalPages: 0,
		totalUsers: 0,
		page: 1,
	},
}
export const getUsersAsyncThunk = createAsyncThunk<
	any,
	undefined,
	{ state: RootState }
>('users/getUsersAsyncThunk', async (_, thunkApi): Promise<any> => {
	const { count } = thunkApi.getState().users.userData
	try {
		const { data } = await axios.get(
			`${import.meta.env.VITE_BASE_URL}users?count=${count}`
		)
		return data
	} catch (error: any) {
		throw thunkApi.rejectWithValue(error)
	}
})


export const usersAsyncThunk = createAsyncThunk<
	any,
	any,
	{ state: RootState }
>('users/usersAsyncThunk', async (page, thunkApi): Promise<any> => {
	const { userData } = thunkApi.getState().users
	try {
		const { data } = await axios.get(
			`${import.meta.env.VITE_BASE_URL}users?page=${page}&count=${
				userData.count
			}`,
		)
		return data
	} catch (error: any) {
		throw thunkApi.rejectWithValue(error)
	}
})

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setPage(state, action) {
			state.userData.page = action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUsersAsyncThunk.fulfilled, (state, action) => {
			state.status = 'successed'
			state.users = action.payload.users
			state.userData.totalPages = action.payload.total_pages
			state.userData.page = action.payload.page
		})
		builder.addCase(usersAsyncThunk.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(
			usersAsyncThunk.fulfilled,
			(state, { payload }: PayloadAction<any>) => {
				state.status = 'successed'
				state.users = [...state.users,...payload.users]
				state.userData.totalPages = payload.total_pages
				state.userData.page = payload.page
				state.userData.totalUsers = payload.total_users
			},
		)
		builder.addCase(
			usersAsyncThunk.rejected,
			(state, action: PayloadAction<any>) => {
				state.status = 'rejected'
				state.error = action.payload
			},
		)
	},
})

export const { setPage } = usersSlice.actions

export default usersSlice.reducer
