import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IPosition } from '../../interfaces/interfaces'
import axios from 'axios'
import { RootState } from '../store'

interface IPositionState {
	status: 'loading' | 'successed' | 'rejected'
	error: string | null
	positions: IPosition[]
}

const initialState: IPositionState = {
	status: 'loading',
	error: null,
	positions: [],
}

export const positionsAsyncThunk = createAsyncThunk<
	IPosition[],
	undefined,
	{ state: RootState }
>(
	'positions/positionsAsyncThunk',
	async (_, thunkApi): Promise<IPosition[]> => {
		try {
			const { data } = await axios.get(
				`${import.meta.env.VITE_BASE_URL}positions`,
			)
			return data.positions
		} catch (error: any) {
			throw thunkApi.rejectWithValue(error)
		}
	},
)

const positionsSlice = createSlice({
	name: 'positions',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(positionsAsyncThunk.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})
		builder.addCase(
			positionsAsyncThunk.fulfilled,
			(state, action: PayloadAction<IPosition[]>) => {
				state.status = 'successed'
				state.positions = action.payload
			},
		)
		builder.addCase(
			positionsAsyncThunk.rejected,
			(state, action: PayloadAction<any>) => {
				state.status = 'rejected'
				state.error = action.payload
			},
		)
	},
})

export default positionsSlice.reducer
