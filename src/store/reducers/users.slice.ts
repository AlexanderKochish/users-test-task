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
		builder.addCase(usersAsyncThunk.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(
			usersAsyncThunk.fulfilled,
			(state, { payload }: PayloadAction<any>) => {
				state.users = [...state.users, ...payload.users].sort(( a:any, b:any ) => b.registration_timestamp - a.registration_timestamp)
				state.userData.totalPages = payload.total_pages
				state.userData.totalUsers = payload.total_users
				state.userData.count = payload.count
				state.userData.page = payload.page
				state.status = 'successed'
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
