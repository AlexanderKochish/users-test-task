import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { ICreateUser, IRegisterForm } from '../../interfaces/interfaces'

interface ISignUpState {
	status: 'loading' | 'successed' | 'rejected'
	error: string | null
	token: string
	positionId: string
	createUser: ICreateUser
}

const initialState: ISignUpState = {
	status: 'loading',
	error: null,
	token: '',
	positionId: '',
	createUser: {
		success: false,
		user_id: 0,
		message: '',
	},
}

export const getTokenAsyncThunk = createAsyncThunk<
	string,
	undefined,
	{ state: RootState }
>('signup/getTokenAsyncThunk', async (_, thunkApi): Promise<string> => {
	try {
		const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}token`)
		localStorage.setItem('token', data.token)
		return data.token
	} catch (error: any) {
		throw thunkApi.rejectWithValue(error)
	}
})

export const signUpAsyncThunk = createAsyncThunk<
	ICreateUser,
	IRegisterForm,
	{ state: RootState }
>('signup/signUpAsyncThunk', async (data, thunkApi): Promise<ICreateUser> => {
	const { signup } = thunkApi.getState()
	const formData = new FormData()
	formData.append('name', data.name)
	formData.append('email', data.email)
	formData.append('phone', data.phone)
	formData.append('position_id', signup.positionId)
	formData.append('photo', data.photo[0])
	let token = localStorage.getItem('token')
	try {
		const { data } = await axios.post(
			`${import.meta.env.VITE_BASE_URL}users`,
			formData,
			{
				headers: {
					Token: token,
				},
			},
		)
		location.reload()
		location.replace('/success')
		return data
	} catch (error) {
		throw thunkApi.rejectWithValue(error)
	}
})

const signUpSlice = createSlice({
	name: 'signup',
	initialState,
	reducers: {
		setPositionId(state, action) {
			state.positionId = action.payload
		},
	},
	extraReducers: (builder) => {
		// GET NEW TOKEN
		builder.addCase(getTokenAsyncThunk.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(
			getTokenAsyncThunk.fulfilled,
			(state, action: PayloadAction<string>) => {
				state.status = 'successed'
				state.token = action.payload
			},
		)
		builder.addCase(
			getTokenAsyncThunk.rejected,
			(state, action: PayloadAction<any>) => {
				state.status = 'rejected'
				state.error = action.payload
			},
		)
		//  CREATE NEW USER
		builder.addCase(signUpAsyncThunk.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(
			signUpAsyncThunk.fulfilled,
			(state, action: PayloadAction<ICreateUser>) => {
				state.status = 'successed'
				state.createUser = action.payload
			},
		)
		builder.addCase(
			signUpAsyncThunk.rejected,
			(state, action: PayloadAction<any>) => {
				state.status = 'rejected'
				state.error = action.payload
			},
		)
	},
})
export const { setPositionId } = signUpSlice.actions
export default signUpSlice.reducer
